/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Allergy = sequelize.define('Allergy', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		}
	}, {
		tableName: 'Allergy',
		timestamps: true
	});


	Allergy.associate = function(models) {
	};
	
	return Allergy;
};
