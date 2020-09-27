"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_Hashtag",
    {
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hashtag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "story_hashtag",
      freezeTableName: true,
      underscored: true,
      paranoid: true, //soft delete
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
