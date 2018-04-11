/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Diagnosis = sequelize.define('Diagnosis', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

    }, {
		tableName: 'Diagnosis',
		timestamps: true
	});

	Diagnosis.associate = function(models) {
		models.Diagnosis.belongsTo(models.Patient);
		models.Diagnosis.belongsTo(models.Doctor);
	};


	return Diagnosis;
};
