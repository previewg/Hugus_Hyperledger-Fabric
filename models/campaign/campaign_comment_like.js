"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign_Comment_Like",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "campaign_comment_like",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
