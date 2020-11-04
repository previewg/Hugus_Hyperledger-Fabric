"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign_Donate",
    {
      hashed_email: {
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
      tableName: "campaign_donate",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
