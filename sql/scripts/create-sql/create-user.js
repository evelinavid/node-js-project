const createUsers = (sellers) => {
    const sellerInsertionRows = sellers
    .map(({
        name,
        surname,
        phone,
        email,
    }) => `('${email}', '$2b$10$/oolJQxqMnjLmsB8iaaBguk67FPht.zUAXTb2A1zRTF70mv8WmzG6', '${name}', '${surname}', '${phone}', 'USER')`)
    .join(',\n');

    return `
    INSERT INTO user(email, password, name, surname, phone, role) values
    ('admin@cars.com', '$2b$10$/oolJQxqMnjLmsB8iaaBguk67FPht.zUAXTb2A1zRTF70mv8WnnG6', 'Noah', 'Lake', '+37058981245', 'ADMIN'),
    ${sellerInsertionRows};
    `;
};

module.exports = createUsers;
