'use strict';
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
//개발용인지 배포용(production)인지 나눔.
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Story = require('./story')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.Campaign = require('./campaign')(sequelize, Sequelize);

db.User.hasMany(db.Story,{foreignKey:'user_email',sourceKey:'email'});
db.User.hasMany(db.Comment,{foreignKey:'user_email',sourceKey:'email'});
db.User.hasMany(db.Campaign,{foreignKey:'user_email',sourceKey:'email'});

db.Story.hasMany(db.Comment,{foreignKey:'story_id',sourceKey:'id'});
db.Story.hasMany(db.Like,{foreignKey:'story_id',sourceKey:'id'});
db.Story.belongsTo(db.User,{foreignKey:'user_email',targetKey:'email'});

db.Comment.belongsTo(db.Story,{foreignKey:'story_id',targetKey:'id'});
db.Comment.belongsTo(db.User,{foreignKey:'user_email',targetKey:'email'});
db.Comment.belongsTo(db.Campaign,{foreignKey:'campaign_id',targetKey:'id'});

db.Like.belongsTo(db.Story,{foreignKey:'story_id',targetKey:'id'});
db.Like.belongsTo(db.User,{foreignKey:'user_email',targetKey:'email'});
db.Like.belongsTo(db.Campaign,{foreignKey:'campaign_id',targetKey:'id'});

db.Campaign.hasMany(db.Comment,{foreignKey:'campaign_id',sourceKey:'id'});
db.Campaign.hasMany(db.Like,{foreignKey:'campaign_id',sourceKey:'id'});
db.Campaign.belongsTo(db.User,{foreignKey:'user_email',targetKey:'email'});


module.exports = db;

