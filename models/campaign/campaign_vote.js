"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign_Vote",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "campaign_vote",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
