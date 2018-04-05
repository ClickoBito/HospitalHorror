/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let PatientInfo = sequelize.define('PatientInfo', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
        bloodPressure: DataTypes.STRING,
        patientNotes: DataTypes.STRING
    }, {
		tableName: 'PatientInfo',
		timestamps: true
	});

	PatientInfo.associate = function(models) {
        PatientInfo.belongsTo(models.Patient);
	};

	return PatientInfo;
};
