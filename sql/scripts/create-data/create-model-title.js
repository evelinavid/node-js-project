const createModelTitles = (cars) => [...new Set(cars.map((x) => x.model))];
module.exports = createModelTitles;
