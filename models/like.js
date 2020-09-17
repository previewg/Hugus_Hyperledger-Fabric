'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
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
        Like:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
    },{
        tableName:'like',
        freezeTableName: true,
        underscored: true,
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};