const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // DB 연결 인스턴스

// JobTag 모델
const JobTag = sequelize.define('JobTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobPostingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'job_posting_id',
    references: {
      model: 'job_postings', // 채용 공고 테이블과 연결
      key: 'id',
    },
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'job_tags',
  timestamps: false,
});

module.exports = {
    JobTag,
  };
  