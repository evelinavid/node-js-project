const createModels = (cars, brandMap) => {
    const insertionRows = cars
    .map((x) => [brandMap[x.brand], x.model])
    .map(([id, title]) => `(${id}, '${title}')`)
    .join(',\n');

    return `
    INSERT into model(brandId,title) values
    ${insertionRows};
    `;
};

module.exports = createModels;
