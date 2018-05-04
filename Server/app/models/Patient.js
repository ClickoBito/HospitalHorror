/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
	let Patient = sequelize.define('Patient', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		// Female correspond to 0 and Male correspond to 1
		gender: DataTypes.INTEGER,
		ssNbr: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		address: DataTypes.STRING,
		dateofbirth: DataTypes.DATEONLY,
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
		getterMethods: {
			fullname: function() {
				return this.firstname + ' ' + this.lastname;
			},
			age: function() {
				return moment().diff(this.dateofbirth, 'years');
			},
			dateofbirth_formatted: function() {
				return moment(this.dateofbirth).format('Do MMM YYYY');
			}
		}

	});

	Patient.associate = function(models) {
		models.Patient.hasMany(models.PatientInfo);
		models.Patient.hasMany(models.Allergy);
		models.Patient.hasMany(models.Diagnosis);
		models.Patient.belongsTo(models.Doctor);
	};

	return Patient;
};
