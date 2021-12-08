const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Decision = sequelize.define('decision', {
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
    int_num: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date1: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    id_employees: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date2: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    relations: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reasons: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Decision;