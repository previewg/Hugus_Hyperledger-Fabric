"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Campaign",
    {
      campaign_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      campaign_value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visited: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "campaign",
      freezeTableName: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};

// mysql event scheduler
// CREATE EVENT IF NOT EXISTS set_expired_for_campaign ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP DO UPDATE campaign SET expired=true WHERE created_at < DATE_ADD(curdate(), INTERVAL -60 DAY);
