"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign_Hashtag",
    {
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hashtag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "campaign_hashtag",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
