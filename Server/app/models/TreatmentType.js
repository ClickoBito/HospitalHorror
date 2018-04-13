/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let TreatmentType = sequelize.define('TreatmentType', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		treatmentTypeName: DataTypes.STRING,
		
    }, {
		tableName: 'TreatmentType',
		timestamps: true
	});

	TreatmentType.associate = function(models) {
	};


	return TreatmentType;
};
