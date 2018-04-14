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
		tableName: 'Secretary',
		timestamps: true
	});


	Secretary.associate = function(models) {
		models.Secretary.belongsTo(models.User);
	};

	return Secretary;
};
