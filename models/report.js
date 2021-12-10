const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Report = sequelize.define('report', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date_departure: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    date_arrival: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    reasons: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Report;