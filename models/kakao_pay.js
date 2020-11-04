"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Kakao_Pay",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashed_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      campaign_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "kakao_pay",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
