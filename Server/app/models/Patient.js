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
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		dateofbirth: DataTypes.DATE,
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
