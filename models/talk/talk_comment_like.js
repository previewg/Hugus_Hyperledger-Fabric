"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Talk_Comment_Like",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "talk_comment_like",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
