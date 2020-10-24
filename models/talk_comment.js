"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Talk_Comment",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      talk_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "talk_comment",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
