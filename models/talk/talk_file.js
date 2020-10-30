"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Talk_File",
    {
      talk_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "talk_file",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
