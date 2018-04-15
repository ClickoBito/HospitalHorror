/*jslint node: true */
'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	let User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		userType: {
			type: Sequelize.ENUM,
			values: ['Admin', 'Doctor', 'Nurse', 'Secretary']
		},
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		//the below attribute can be useful to determine
		//the type of user that logged in, also might
		//be useful in given the admin conrete options
		//when registring new users
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	}, {
		tableName: 'User',
		timestamps: true
	});

	User.associate = function(models) {
		models.User.hasMany(models.Doctor);
		models.User.hasMany(models.Nurse);
		models.User.hasMany(models.Secretary);
		models.User.hasMany(models.Admin);
	};
	sequelize.sync().then(function() {
		sequelize.query('CREATE TRIGGER create_userType AFTER INSERT ON user' +
		' FOR EACH ROW BEGIN IF (new.userType = \'Admin\') THEN INSERT INTO' +
		' Admin (UserId) VALUES (new.id);END IF;IF (new.userType = \'Doctor\')' +
		' THEN INSERT INTO Doctor (UserId) VALUES (new.id);END IF;IF' +
		' (new.userType = \'Nurse\') THEN INSERT INTO Nurse (UserId)' +
		' VALUES (new.id);END IF;IF(new.userType = \'Secretary\')' +
		' THEN INSERT INTO Secretary (UserId) VALUES (new.id);END IF;END;')
	});

	return User;
};
