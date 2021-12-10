const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Report = sequelize.define('report', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date_departure: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    date_arrival: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    id_employees: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reasons: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Report;