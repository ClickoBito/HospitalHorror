/*jslint node: true */
'use strict';

module.exports = function(sequelize, DataTypes) {
	let Doctor = sequelize.define('Doctor', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		dateofbirth: DataTypes.DATE,
		phone: DataTypes.STRING,
		email: DataTypes.STRING
	}, {
		tableName: 'Doctor',
		timestamps: true
	});

	return Doctor;
};
