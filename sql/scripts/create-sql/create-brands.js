const createBrand = (brandTitles) => {
    const insertionRows = brandTitles
    .map((x) => `('${x}')`)
    .join(',\n');

    return `
    INSERT into brand(title) values
    ${insertionRows};
    `;
};

module.exports = createBrand;
