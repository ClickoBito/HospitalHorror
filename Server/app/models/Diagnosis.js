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
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
    }, {
		tableName: 'Diagnosis',
		timestamps: true
	});

	Diagnosis.associate = function(models) {
		models.Diagnosis.belongsTo(models.Patient);
		models.Diagnosis.belongsTo(models.Doctor);
		models.Diagnosis.belongsTo(models.DiagnosisType);
		models.Diagnosis.belongsTo(models.Treatment);
	};


	return Diagnosis;
};
