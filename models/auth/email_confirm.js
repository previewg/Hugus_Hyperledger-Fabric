"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Email_confirm",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
      key_for_verify: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "email_confirm",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
