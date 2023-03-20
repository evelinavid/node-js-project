const createCars = (cars, modelMap, usersEmailIdMap) => {
    const carsInsertionRows = cars
    .map(({
    seller,
    price,
    year,
    model,
}) => `(${usersEmailIdMap[seller.email]}, ${year}, ${price}, ${modelMap[model]})`)
.join(',\n');

return `
INSERT INTO car(userId, year, price, modelId) values
${carsInsertionRows};`;
};

module.exports = createCars;
