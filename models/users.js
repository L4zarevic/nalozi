const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: Sequelize.STRING,
    pass: Sequelize.STRING,
    name: Sequelize.STRING
});

module.exports = Users;
