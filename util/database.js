const Sequelize = require('sequelize');

const sequelize = new Sequelize('mojaopt_nalozi', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
