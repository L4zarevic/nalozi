const Sequelize = require('sequelize');

const sequelize = new Sequelize('mojaopt_nalozi', 'mojaopt_moptic', 'mP9!1&plTK$sE%aB8DdM', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
