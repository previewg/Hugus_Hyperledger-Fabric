'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Campaign_Comment', {
       user_email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        campaign_id:{
           type:DataTypes.INTEGER,
            allowNull:false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
    },{
        tableName:'campaign_comment',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};