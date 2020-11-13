"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_Report",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      case_detail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      replied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "story_report",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
