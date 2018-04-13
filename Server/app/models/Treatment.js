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
		description: DataTypes.STRING,
    }, {
		tableName: 'Treatment',
		timestamps: true
	});

/* 	Treatment.associate = function(models) {
		models.Treatment.belongsTo(models.Patient);
	}; */

	return Treatment;
};
