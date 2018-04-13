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

    }, {
		tableName: 'DiagnosisType',
		timestamps: true
	});

	DiagnosisType.associate = function(models) {
	};


	return DiagnosisType;
};
