const createSellers = (cars) => cars
.map((x) => x.seller)
.filter((x, i, arr) => arr.findIndex((y) => x.email === y.email) === i);

module.exports = createSellers;