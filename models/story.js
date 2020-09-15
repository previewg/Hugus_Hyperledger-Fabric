'use strict';

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Story', {
		story_title:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		user_info:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		story_content:{
			type:DataTypes.TEXT,
			allowNull:false,
		},
		story_file:{
			type:DataTypes.STRING,
			allowNull:true,
		},
		story_hashtag:{
			type:DataTypes.STRING,
			allowNull:false,
		}
	},{
		tableName:'story',
		freezeTableName: true,
		underscored: true,
		paranoid: true, //soft delete
		charset : 'utf8mb4',
		collate:'utf8mb4_general_ci'
	})
};