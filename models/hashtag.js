'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hashtag', {
        hashtag:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        tableName:'hashtag',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};