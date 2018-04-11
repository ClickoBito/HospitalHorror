/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let AllergyType = sequelize.define('AllergyType', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
        },
        AllergyTypeName: DataTypes.STRING,
	}, {
		tableName: 'AllergyType',
		timestamps: true
	});


	AllergyType.associate = function(models) {
	};
	
	return AllergyType;
};
