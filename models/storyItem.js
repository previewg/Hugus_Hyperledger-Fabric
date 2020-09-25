'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StoryItem', {
        story_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        item_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },

    },{
        tableName:'storyItem',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};