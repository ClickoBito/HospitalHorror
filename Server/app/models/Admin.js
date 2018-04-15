/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Admin = sequelize.define('Admin', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		dateofbirth: DataTypes.DATEONLY,
		phone: DataTypes.STRING,
		email: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'Admin',
		timestamps: true
	});


	Admin.associate = function(models) {
		models.Admin.belongsTo(models.User);
	};

	return Admin;
};
