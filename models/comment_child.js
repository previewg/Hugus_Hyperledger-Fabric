'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment_child', {
       user_email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        story_id:{
           type:DataTypes.INTEGER,
            allowNull:false,
        },
        comment_id:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        comment_child:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
    },{
        tableName:'comment_child',
        freezeTableName: true,
        underscored: true,
        paranoid: true, //soft delete
        charset : 'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
};