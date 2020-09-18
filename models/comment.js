'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
       user_email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        story_id:{
           type:DataTypes.INTEGER,
            allowNull:false,
        },
        campaign_id:{
           type:DataTypes.INTEGER,
            allowNull:false,
        },
        comments:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
    },{
        tableName:'comment',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};