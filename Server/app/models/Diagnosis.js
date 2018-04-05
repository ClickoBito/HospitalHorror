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
		diagnosisType: {
			type: Sequelize.ENUM,
			//not sure what types there are, just a placeholder
			values: ['1', '2', '3', '4']
		}

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
