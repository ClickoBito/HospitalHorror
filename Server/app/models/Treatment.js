/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
	let Treatment = sequelize.define('Treatment', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		treatmentType: {
			type: Sequelize.ENUM,
			//not sure what types there are, just a placeholder
			values: ['1', '2', '3', '4']
		}
    }, {
		tableName: 'Treatment',
		timestamps: true
	});

/* 	Treatment.associate = function(models) {
		models.Treatment.belongsTo(models.Patient);
	}; */

	return Treatment;
};
