/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Patient = sequelize.define('Patient', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		// Female correspond to 0 and Male correspond to 1
		gender: DataTypes.INTEGER,
		ssNbr: DataTypes.INTEGER,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		address: DataTypes.STRING,
		dateofbirth: DataTypes.DATE,
		phone: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'Patient',
		timestamps: true,



	});


	Patient.associate = function(models) {
		models.Patient.hasMany(models.PatientInfo);
		models.Patient.hasMany(models.Allergy);
		models.Patient.hasMany(models.Diagnosis);
	};

	return Patient;
};
