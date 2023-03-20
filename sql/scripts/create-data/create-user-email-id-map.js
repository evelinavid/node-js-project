const createUsersEmailIdMap = (sellers) => sellers.reduce((prevMap, user, i) => ({
    ...prevMap,
    [user.email]: i + 2,
}), {});

module.exports = createUsersEmailIdMap;
