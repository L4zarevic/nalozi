const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Vehicle = sequelize.define('vehicle', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    car: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Vehicle;