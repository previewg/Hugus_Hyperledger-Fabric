"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Story_Item",
    {
      story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      item_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "story_item",
      freezeTableName: true,
      underscored: true,
      paranoid: true, //soft delete
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
};
