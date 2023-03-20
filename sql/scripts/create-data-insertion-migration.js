const fs = require('fs');

const dbData = require('../old-data/db.json');
const createCars = require('./create-sql/create-cars');
const createBrandMap = require('./create-data/create-brand-map');
const createBrandTitles = require('./create-data/create-brand-titles');
const createSellers = require('./create-data/create-sellers');
const createUsersEmailIdMap = require('./create-data/create-user-email-id-map');
const createUsers = require('./create-sql/create-user');
const createBrand = require('./create-sql/create-brands');
const createModels = require('./create-sql/create-models');
const createFeatureNames = require('./create-data/create-feature-names');
const createFeatures = require('./create-sql/create-feature');
const createCarsImages = require('./create-sql/create-car-images');
const createModelMap = require('./create-data/create-model-map');
const createModelTitles = require('./create-data/create-model-title');

const { cars } = dbData;

const sellers = createSellers(cars);
const brandTiles = createBrandTitles(cars);
const brandMap = createBrandMap(brandTiles);
const usersEmailIdMap = createUsersEmailIdMap(sellers);
const featureNames = createFeatureNames(cars);
const modelTitles = createModelTitles(cars);
const modelMap = createModelMap(modelTitles);

const brandSql = createBrand(brandTiles);
const modelSql = createModels(cars, brandMap);
const featureSql = createFeatures(cars, featureNames);
const usersSql = createUsers(sellers);
const carsSql = createCars(cars, modelMap, usersEmailIdMap);
const imagesSql = createCarsImages(cars);

const dataInsertionMigration = [
    brandSql,
    modelSql,
    usersSql,
    carsSql,
    imagesSql,
    featureSql,
].join('\n');

const date = new Date();
const dateStr = date.toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
})
.replaceAll(':', '-')
.replaceAll(' ', '-');
fs.writeFile(
`sql/migrations/migration-${dateStr}-data-insertion.sql`,
dataInsertionMigration,

(err) => err && console.log(err),
);
