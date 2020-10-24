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
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
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
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
