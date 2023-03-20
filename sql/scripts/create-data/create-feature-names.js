const createFeatureNames = (cars) => [...new Set(
    cars.map((x) => x.features).map((x) => Object.keys(x)).flat(),
    )];

    module.exports = createFeatureNames;
