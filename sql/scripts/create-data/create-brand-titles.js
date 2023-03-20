const createBrandTitles = (cars) => [...new Set(cars.map((x) => x.brand))];

module.exports = createBrandTitles;
