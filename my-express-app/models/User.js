const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
}, {
    tableName: 'users', // 테이블 이름을 지정
    timestamps: false,  // createdAt과 updatedAt 비활성화
});

module.exports = User;
