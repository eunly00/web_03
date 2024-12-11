const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Company = require('./Company'); // companies 모델 가져오기

const JobPosting = sequelize.define('JobPosting', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company, // companies 테이블 참조
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    salary: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    employment_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    posted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    salary_text: {
        type: DataTypes.STRING(100),
        allowNull: true,
        
    },
    view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 기본값 0
    },
}, {
    tableName: 'job_postings', // 테이블 이름
    timestamps: false, // createdAt/updatedAt 자동 생성 비활성화
});

module.exports = JobPosting;
