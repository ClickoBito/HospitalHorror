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
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
    }, {
		tableName: 'Treatment',
		timestamps: true
	});

 	Treatment.associate = function(models) {
		models.Treatment.belongsTo(models.TreatmentType);
		models.Treatment.hasOne(models.Diagnosis);
	};

	return Treatment;
};
