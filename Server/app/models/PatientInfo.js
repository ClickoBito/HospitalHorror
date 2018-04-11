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
		measurementType: DataTypes.STRING,
		measurementValue: DataTypes.INT,
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'PatientInfo',
		timestamps: true
	});

	PatientInfo.associate = function(models) {
        PatientInfo.belongsTo(models.Patient);
	};

	return PatientInfo;
};
