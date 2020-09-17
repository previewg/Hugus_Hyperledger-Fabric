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
		story_item:{
			type:DataTypes.STRING,
			allowNull:true,
		},
		story_hashtag:{
			type:DataTypes.STRING,
			allowNull:false,
		},
		story_goal:{
			type:DataTypes.INTEGER,
			allowNull:false,
		},
		story_vote:{
			type:DataTypes.INTEGER,
			allowNull:true,
		},
		user_email:{
			type:DataTypes.STRING,
			allowNull:false,
		},
		visited:{
			type:DataTypes.INTEGER,
			allowNull:true,
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