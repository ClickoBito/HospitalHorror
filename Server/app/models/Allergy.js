/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let Allergy = sequelize.define('Allergy', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		allergyType: {
			type: Sequelize.ENUM,
			//not sure what types there are, just a placeholder
			values: ['1', '2', '3', '4']
		}
	}, {
		tableName: 'Allergy',
		timestamps: true
	});


	Allergy.associate = function(models) {
	};
	
	return Allergy;
};
