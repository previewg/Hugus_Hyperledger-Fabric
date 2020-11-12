"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Talk",
    {
      talk_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      talk_content: {
        type: DataTypes.TEXT,
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
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "talk",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
