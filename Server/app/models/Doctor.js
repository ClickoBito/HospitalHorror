/*jslint node: true */
'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
	let Doctor = sequelize.define('Doctor', {
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
		Speciality: {
			type:  Sequelize.ENUM,
			values: ['Anesthesiologists','Cardiologist','Dermatologist', 'Hematologist', 'Diabetologist', 'Psychiatrist','Pediatrician','General Practioner']
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
		tableName: 'Doctor',
		timestamps: true,
		getterMethods: {
			fullname: function() {
				return this.firstname + ' ' + this.lastname;
			}
		}
	});


	Doctor.associate = function(models) {
		models.Doctor.belongsTo(models.User);
		models.Doctor.hasMany(models.Diagnosis);
		models.Doctor.hasMany(models.Patient);
	};

	return Doctor;
};
