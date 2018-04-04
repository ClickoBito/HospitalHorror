/*jslint node: true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		tableName: 'User',
		timestamps: true
	});

	return User;
};
