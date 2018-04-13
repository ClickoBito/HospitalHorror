/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Allergy = sequelize.define('Allergy', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'Allergy',
		timestamps: true
	});


	Allergy.associate = function(models) {
		models.Allergy.belongsTo(models.AllergyType);
		models.Allergy.belongsTo(models.Patient);
	};
	
	return Allergy;
};
