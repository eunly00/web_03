const JobPosting = require('./JobPosting');
const Company = require('./Company');
const Application = require('./Application');
const Bookmark = require('./Bookmark');
const User = require('./User');

// JobPosting과 Company 관계 설정
JobPosting.belongsTo(Company, {
    foreignKey: 'company_id',
    as: 'company', // JobPosting에서 참조할 때 'company' alias 사용
});

Company.hasMany(JobPosting, {
    foreignKey: 'company_id',
    as: 'jobPostings', // Company에서 참조할 때 'jobPostings' alias 사용
});

// User와 Application 관계 설정
User.hasMany(Application, { 
    foreignKey: 'user_id', 
    as: 'applications' // User에서 참조할 때 'applications' alias 사용
});

Application.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'users' // Application에서 참조할 때 'user' alias 사용
});

// JobPosting과 Application 관계 설정
JobPosting.hasMany(Application, { 
    foreignKey: 'job_posting_id', 
    as: 'applications' // JobPosting에서 참조할 때 'applications' alias 사용
});

Application.belongsTo(JobPosting, { 
    foreignKey: 'job_posting_id', 
    as: 'jobPosting' // Application에서 참조할 때 'jobPosting' alias 사용
});

// User와 Bookmark 관계 설정
User.hasMany(Bookmark, { 
    foreignKey: 'user_id', 
    as: 'bookmarks' // User에서 참조할 때 'bookmarks' alias 사용
});

Bookmark.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'users' // Bookmark에서 참조할 때 'user' alias 사용
});

// JobPosting과 Bookmark 관계 설정
JobPosting.hasMany(Bookmark, { 
    foreignKey: 'job_posting_id', 
    as: 'bookmarks' // JobPosting에서 참조할 때 'bookmarks' alias 사용
});

Bookmark.belongsTo(JobPosting, { 
    foreignKey: 'job_posting_id', 
    as: 'jobPosting' // Bookmark에서 참조할 때 'jobPosting' alias 사용
});

module.exports = {
    User,
    JobPosting,
    Company,
    Application,
    Bookmark,
};
