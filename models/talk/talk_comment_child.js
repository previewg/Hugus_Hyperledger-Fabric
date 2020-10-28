"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Talk_Comment_Child",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "talk_comment_child",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
