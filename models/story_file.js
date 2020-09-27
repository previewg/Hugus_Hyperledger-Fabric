"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_File",
    {
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "story_file",
      freezeTableName: true,
      underscored: true,
      paranoid: true, //soft delete
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
