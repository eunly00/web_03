const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // DB 연결 인스턴스


// UserActivity 모델
const UserActivity = sequelize.define('UserActivity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users', // 사용자 테이블과 연결
        key: 'id',
      },
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'activity_type',
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user_activities',
    timestamps: false,
  });

  module.exports = {
    UserActivity,
  };
  