/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let AllergyType = sequelize.define('AllergyType', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
        },
		allergyTypeName: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
		
	}, {
		tableName: 'AllergyType',
		timestamps: true
	});


	AllergyType.associate = function(models) {
		models.AllergyType.hasMany(models.Allergy);
	};
	
	return AllergyType;
};
