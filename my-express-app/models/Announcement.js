const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active', // 데이터베이스 실제 컬럼 이름과 매핑
  },
}, {
  tableName: 'announcements',
  timestamps: false,
});

module.exports = Announcement;
