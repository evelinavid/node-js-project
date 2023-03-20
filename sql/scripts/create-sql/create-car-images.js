const createCarsImages = (cars) => {
    const carImagesInsertionRows = cars
    .reduce((carsImages, car, i) => {
        const carId = i + 1;
        const carImages = car.images.map((x) => ({ carId, src: x }));

        return carsImages.concat(carImages);
    }, [])
    .map(({ carId, src }) => `(${carId}, '${src}')`)
    .join(',\n');

    return `
    INSERT INTO image(carId, src) values
    ${carImagesInsertionRows};
    `;
};

module.exports = createCarsImages;
