'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('story_Comment', {
       user_email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        story_id:{
           type:DataTypes.INTEGER,
            allowNull:false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
    },{
        tableName:'story_comment',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};