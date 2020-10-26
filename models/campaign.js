"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign",
    {
      campaign_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      campaign_file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      campaign_hashtag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      campaign_vote: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      visited: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "campaign",
      freezeTableName: true,
      underscored: true,
      paranoid: true, //soft delete
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
