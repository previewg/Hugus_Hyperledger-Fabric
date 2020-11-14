"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_Report_Reply",
    {
      report_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reply: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "story_report_reply",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
