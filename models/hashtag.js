"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Hashtag",
    {
      hashtag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "hashtag",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
