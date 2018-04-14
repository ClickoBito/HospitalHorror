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
		dateofbirth: DataTypes.DATEONLY,
		phone: DataTypes.STRING,
		email: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'Doctor',
		timestamps: true
	});


	Doctor.associate = function(models) {
		models.Doctor.belongsTo(models.User);
		models.Doctor.hasMany(models.Diagnosis);
	};

	return Doctor;
};
