"use strict";
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Email_confirm = require("./email_confirm")(sequelize, Sequelize);
db.Story = require("./story")(sequelize, Sequelize);
db.Story_Comment = require("./story_comment")(sequelize, Sequelize);
db.Story_Comment_Like = require("./story_comment_like")(sequelize, Sequelize);
db.Comment_Child = require("./comment_child")(sequelize, Sequelize);
db.Story_Like = require("./story_like")(sequelize, Sequelize);
db.Campaign = require("./campaign")(sequelize, Sequelize);
db.Campaign_Comment = require("./campaign_comment")(sequelize, Sequelize);
db.Campaign_Like = require("./campaign_like")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Story_Hashtag = require("./story_hashtag")(sequelize, Sequelize);
db.Story_Item = require("./story_item")(sequelize, Sequelize);
db.Story_File = require("./story_file")(sequelize, Sequelize);
db.Story_Vote = require("./story_vote")(sequelize, Sequelize);
db.Act = require("./act")(sequelize, Sequelize);
db.Act_File = require("./act_file")(sequelize, Sequelize);

// User
db.User.hasMany(db.Story, { foreignKey: "user_email", sourceKey: "email" });
db.User.hasMany(db.Story_Comment, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Comment_Child, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Campaign, { foreignKey: "user_email", sourceKey: "email" });
db.User.hasMany(db.Story_Vote, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Story_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Act, {
  foreignKey: "user_email",
  sourceKey: "email",
});

// Story
db.Story.hasMany(db.Story_Comment, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Like, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Item, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Vote, { foreignKey: "story_id", sourceKey: "id" });
db.Story.belongsTo(db.User, { foreignKey: "user_email", targetKey: "email" });
db.Story.belongsToMany(db.Hashtag, {
  through: "Story_Hashtag",
  foreignKey: "story_id",
});

db.Story.hasMany(db.Story_File, { foreignKey: "story_id", sourceKey: "id" });

// Story_Comment
db.Story_Comment.hasMany(db.Comment_Child, {
  foreignKey: "comment_id",
  sourceKey: "id",
});
db.Story_Comment.hasMany(db.Story_Comment_Like, {
  foreignKey: "comment_id",
  sourceKey: "id",
});
db.Story_Comment.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});
db.Story_Comment.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

//Comment_child
db.Comment_Child.belongsTo(db.Story_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});
db.Comment_Child.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Campaign_Comment
db.Campaign_Comment.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});
db.Campaign_Comment.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Story_Like
db.Story_Like.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });
db.Story_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Campaign_Like
db.Campaign_Like.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});
db.Campaign_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Campaign
db.Campaign.hasMany(db.Campaign_Comment, {
  foreignKey: "campaign_id",
  sourceKey: "id",
});
db.Campaign.hasMany(db.Campaign_Like, {
  foreignKey: "campaign_id",
  sourceKey: "id",
});
db.Campaign.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Hashtag
db.Hashtag.belongsToMany(db.Story, {
  through: "Story_Hashtag",
  foreignKey: "hashtag_id",
});
db.Story_Hashtag.belongsTo(db.Hashtag, {
  foreignKey: "hashtag_id",
  targetKey: "id",
});
db.Story_Hashtag.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});
db.Story_Hashtag.hasMany(db.Story_File, {
  foreignKey: "story_id",
  targetKey: "id",
});

// Item
db.Story_Item.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });

// Story_File
db.Story_File.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});

//Story_Vote
db.Story_Vote.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });
db.Story_Vote.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

//Act
db.Act.belongsTo(db.User, { foreignKey: "user_email", targetKey: "email" });
db.Act.hasMany(db.Act_File, { foreignKey: "act_id", sourceKey: "id" });

// Act_File
db.Act_File.belongsTo(db.Act, { foreignKey: "act_id", targetKey: "id" });

//Story Comment Like
db.Story_Comment_Like.belongsTo(db.Story_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});
module.exports = db;
