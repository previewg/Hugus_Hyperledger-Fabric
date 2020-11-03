"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Act_File",
    {
      act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "act_file",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
