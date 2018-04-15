/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let DiagnosisType = sequelize.define('DiagnosisType', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		diagnosisTypeName: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
    }, {
		tableName: 'DiagnosisType',
		timestamps: true
	});

	DiagnosisType.associate = function(models) {
		models.DiagnosisType.hasMany(models.Diagnosis);
	};


	return DiagnosisType;
};
