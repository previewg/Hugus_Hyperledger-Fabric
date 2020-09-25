'use strict';

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Item', {
        item:{
			type:DataTypes.STRING,
			allowNull:true,
		}
	},{
		tableName:'item',
		freezeTableName: true,
		underscored: true,
		paranoid: true, //soft delete
		charset : 'utf8mb4',
		collate:'utf8mb4_general_ci'
	})
};