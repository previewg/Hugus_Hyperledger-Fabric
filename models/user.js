"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      underscored: true,
      paranoid: true, //soft delete
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
