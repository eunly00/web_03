const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    industry: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'companies',
    timestamps: false,
});

module.exports = Company;
