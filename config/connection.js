// instantiate sequelize constructor
const Sequelize = require('sequelize');

// db credential protection
require('dotenv').config();

//creates connection ot the database

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;

