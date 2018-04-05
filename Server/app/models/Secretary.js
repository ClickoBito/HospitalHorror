/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
	let Secretary = sequelize.define('Secretary', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		dateofbirth: DataTypes.DATE,
		phone: DataTypes.STRING,
		email: DataTypes.STRING
	}, {
		tableName: 'Secretary',
		timestamps: true
	});


	Secretary.associate = function(models) {
	};
	
	return Secretary;
};