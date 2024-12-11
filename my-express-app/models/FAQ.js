const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // DB 연결 인스턴스

const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'faqs',
  timestamps: false,
});

module.exports = FAQ;
