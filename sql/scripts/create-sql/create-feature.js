const createFeatures = (cars, featureNames) => {
    const featuresInsertionRows = featureNames
    .map((x) => `('${x}')`)
    .join(',\n');

    const featureIdMap = featureNames.reduce((prevMap, feature, i) => ({
        ...prevMap,
        [feature]: i + 1,
    }), {});

    const featuresSQL = `
    INSERT into feature(name) values
    ${featuresInsertionRows};`;

    const carFeaturesInsertionRows = cars
    .reduce((prevFeatures, car, i) => {
const carId = i + 1;
const carFeatures = Object.keys(car.features).map((x) => ({ carId, featureId: featureIdMap[x] }));
return prevFeatures.concat(carFeatures);
    }, [])
    .map(({ carId, featureId }) => `(${carId}, ${featureId})`)
    .join(',\n');

    const carFeaturesInsertionSQL = `
    INSERT INTO carFeature(carId, featureId) values
    ${carFeaturesInsertionRows};
    `;
    return featuresSQL + carFeaturesInsertionSQL;
};

module.exports = createFeatures;
