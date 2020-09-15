const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
//개발용인지 배포용(production)인지 나눔.
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;

