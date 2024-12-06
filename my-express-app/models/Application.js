const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // 기존 DB 연결

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id', // 실제 데이터베이스의 컬럼 이름
        references: {
            model: 'users', // 연관 테이블 이름
            key: 'id',
        },
    },
    jobPostingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'job_posting_id', // 실제 데이터베이스의 컬럼 이름
        references: {
            model: 'job_postings', // 연관 테이블 이름
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
    },
    appliedAt: {
        type: DataTypes.DATE,
        field: 'applied_at', // 실제 데이터베이스의 컬럼 이름
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'applications', // 실제 테이블 이름
    timestamps: false, // createdAt, updatedAt 자동 생성 방지
});

module.exports = Application;
