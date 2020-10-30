"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Act",
    {
      act_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      act_content: {
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
    },
    {
      tableName: "act",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
