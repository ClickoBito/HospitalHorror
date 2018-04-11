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
		gender: {
			type: Sequelize.ENUM,
			values: ['Male', 'Female']
		},
		ssNbr: DataTypes.INTEGER,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		address: DataTypes.STRING,
		dateofbirth: DataTypes.DATE,
		phone: DataTypes.STRING,
	}, {
		tableName: 'Patient',
		timestamps: true,



	});


	Patient.associate = function(models) {
		models.Patient.belongsTo(models.Doctor);
		models.Patient.hasMany(models.PatientInfo);
		models.Patient.hasMany(models.Treatment);
		models.Patient.hasMany(models.Diagnosis);
	};

	return Patient;
};
