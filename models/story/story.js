"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story",
    {
      story_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      story_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      story_goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visited: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "story",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};

// mysql event scheduler
// CREATE EVENT IF NOT EXISTS set_expired_for_story ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP DO UPDATE story SET expired=true WHERE created_at < DATE_ADD(curdate(), INTERVAL -14 DAY);
