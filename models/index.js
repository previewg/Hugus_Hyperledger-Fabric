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

db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Kakao_Pay = require("./kakao_pay")(sequelize, Sequelize);

//Auth
db.User = require("./auth/user")(sequelize, Sequelize);
db.Email_confirm = require("./auth/email_confirm")(sequelize, Sequelize);

//Story
db.Story = require("./story/story")(sequelize, Sequelize);
db.Story_Comment = require("./story/story_comment")(sequelize, Sequelize);
db.Story_Comment_Like = require("./story/story_comment_like")(
  sequelize,
  Sequelize
);
db.Comment_Child = require("./story/comment_child")(sequelize, Sequelize);
db.Story_Like = require("./story/story_like")(sequelize, Sequelize);
db.Story_Report = require("./story/story_report")(sequelize, Sequelize);
db.Story_Hashtag = require("./story/story_hashtag")(sequelize, Sequelize);
db.Story_Item = require("./story/story_item")(sequelize, Sequelize);
db.Story_File = require("./story/story_file")(sequelize, Sequelize);
db.Story_Vote = require("./story/story_vote")(sequelize, Sequelize);

//Campaign
db.Campaign = require("./campaign/campaign")(sequelize, Sequelize);
db.Campaign_Comment = require("./campaign/campaign_comment")(
  sequelize,
  Sequelize
);
db.Campaign_Like = require("./campaign/campaign_like")(sequelize, Sequelize);
db.Campaign_File = require("./campaign/campaign_file")(sequelize, Sequelize);
db.Campaign_Hashtag = require("./campaign/campaign_hashtag")(
  sequelize,
  Sequelize
);
db.Campaign_Comment_Child = require("./campaign/campaign_comment_child")(
  sequelize,
  Sequelize
);
db.Campaign_Comment_Like = require("./campaign/campaign_comment_like")(
  sequelize,
  Sequelize
);

//Act
db.Act = require("./act/act")(sequelize, Sequelize);
db.Act_File = require("./act/act_file")(sequelize, Sequelize);

//Talk
db.Talk = require("./talk/talk")(sequelize, Sequelize);
db.Talk_File = require("./talk/talk_file")(sequelize, Sequelize);
db.Talk_Comment = require("./talk/talk_comment")(sequelize, Sequelize);
db.Talk_Like = require("./talk/talk_like")(sequelize, Sequelize);
db.Talk_Comment_Child = require("./talk/talk_comment_child")(
  sequelize,
  Sequelize
);
db.Talk_Comment_Like = require("./talk/talk_comment_like")(
  sequelize,
  Sequelize
);

// Mapping //
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
db.User.hasMany(db.Story_Comment_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Campaign, { foreignKey: "user_email", sourceKey: "email" });
db.User.hasMany(db.Campaign_Comment, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Campaign_Comment_Child, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Campaign_Comment_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Story_Vote, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Story_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Story_Report, {
  foreignKey: "user_email",
  sourceKey: "email",
});

db.User.hasMany(db.Campaign_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Talk, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Talk_Comment, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Talk_Comment_Child, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Talk_Comment_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});
db.User.hasMany(db.Talk_Like, {
  foreignKey: "user_email",
  sourceKey: "email",
});

// Story
db.Story.hasOne(db.Campaign, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Comment, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Like, { foreignKey: "story_id", sourceKey: "id" });
db.Story.hasMany(db.Story_Report, { foreignKey: "story_id", sourceKey: "id" });
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

// Story_Comment_Like
db.Story_Comment_Like.belongsTo(db.Story_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});
db.Story_Comment_Like.belongsTo(db.User, {
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

// Story_Like
db.Story_Like.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });
db.Story_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

//Story_Report
db.Story_Report.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});
db.Story_Report.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});
// Story_Item
db.Story_Item.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });

// Story_File
db.Story_File.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});

//Story_Vote
db.Story_Vote.belongsTo(db.Story, { foreignKey: "story_id", targetKey: "id" });
db.Story_Vote.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

// Campaign
db.Campaign.belongsTo(db.Story, {
  foreignKey: "story_id",
  targetKey: "id",
});
db.Campaign.hasOne(db.Act, { foreignKey: "campaign_id", sourceKey: "id" });
db.Campaign.hasOne(db.Talk, { foreignKey: "campaign_id", sourceKey: "id" });
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
db.Campaign.belongsToMany(db.Hashtag, {
  through: "Campaign_Hashtag",
  foreignKey: "campaign_id",
});

db.Campaign.hasMany(db.Campaign_File, {
  foreignKey: "campaign_id",
  sourceKey: "id",
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
db.Campaign_Comment.hasMany(db.Campaign_Comment_Like, {
  foreignKey: "comment_id",
  sourceKey: "id",
});
db.Campaign_Comment.hasMany(db.Campaign_Comment_Child, {
  foreignKey: "comment_id",
  sourceKey: "id",
});

// Campaign_Comment_Child
db.Campaign_Comment_Child.belongsTo(db.Campaign_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});
db.Campaign_Comment_Child.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Campaign_Comment_Like
db.Campaign_Comment_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});
db.Campaign_Comment_Like.belongsTo(db.Campaign_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
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

// Campaign_File
db.Campaign_File.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});

// Hashtag
db.Hashtag.hasMany(db.Story_Hashtag, {
  foreignKey: "hashtag_id",
  sourceKey: "id",
});
db.Hashtag.belongsToMany(db.Story, {
  through: "Story_Hashtag",
  foreignKey: "hashtag_id",
});
db.Hashtag.hasMany(db.Campaign_Hashtag, {
  foreignKey: "hashtag_id",
  sourceKey: "id",
});
db.Hashtag.belongsToMany(db.Campaign, {
  through: "Campaign_Hashtag",
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

db.Campaign_Hashtag.belongsTo(db.Hashtag, {
  foreignKey: "hashtag_id",
  targetKey: "id",
});
db.Campaign_Hashtag.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});

//Act
db.Act.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});
db.Act.hasMany(db.Act_File, { foreignKey: "act_id", sourceKey: "id" });

// Act_File
db.Act_File.belongsTo(db.Act, { foreignKey: "act_id", targetKey: "id" });

//Talk
db.Talk.belongsTo(db.Campaign, {
  foreignKey: "campaign_id",
  targetKey: "id",
});
db.Talk.hasMany(db.Talk_Comment, { foreignKey: "talk_id", sourceKey: "id" });
db.Talk.belongsTo(db.User, { foreignKey: "user_email", targetKey: "email" });
db.Talk.hasMany(db.Talk_File, { foreignKey: "talk_id", sourceKey: "id" });
db.Talk.hasMany(db.Talk_Like, { foreignKey: "talk_id", sourceKey: "id" });

//Talk_File
db.Talk_File.belongsTo(db.Talk, { foreignKey: "talk_id", targetKey: "id" });

//Talk_comment
db.Talk_Comment.hasMany(db.Talk_Comment_Child, {
  foreignKey: "comment_id",
  sourceKey: "id",
});
db.Talk_Comment.hasMany(db.Talk_Comment_Like, {
  foreignKey: "comment_id",
  sourceKey: "id",
});
db.Talk_Comment.belongsTo(db.Talk, {
  foreignKey: "talk_id",
  targetKey: "id",
});
db.Talk_Comment.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

//Talk_Comment_child
db.Talk_Comment_Child.belongsTo(db.Talk_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});
db.Talk_Comment_Child.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Talk_Like
db.Talk_Like.belongsTo(db.Talk, { foreignKey: "talk_id", targetKey: "id" });
db.Talk_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});

// Talk_Comment_Like
db.Talk_Comment_Like.belongsTo(db.User, {
  foreignKey: "user_email",
  targetKey: "email",
});
db.Talk_Comment_Like.belongsTo(db.Talk_Comment, {
  foreignKey: "comment_id",
  targetKey: "id",
});

module.exports = db;
