const createModelMap = (modelTitles) => modelTitles.reduce((prevMap, modelTitle, i) => ({
...prevMap,
[modelTitle]: i + 1,
}), {});

module.exports = createModelMap;
