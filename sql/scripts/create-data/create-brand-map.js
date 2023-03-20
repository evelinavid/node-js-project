const createBrandMap = (brandTitles) => brandTitles.reduce((prevMap, brandTitle, i) => ({
    ...prevMap,
    [brandTitle]: i + 1,
}), {});

module.exports = createBrandMap;
