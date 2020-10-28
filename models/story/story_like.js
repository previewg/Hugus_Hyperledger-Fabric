"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_Like",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "story_like",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
