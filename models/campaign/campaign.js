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
      campaign_goal: {
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
    },
    {
      tableName: "campaign",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
