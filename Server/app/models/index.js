/*
	Using Sequelize as ORM framework
*/

/*jslint node: true */
'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const db        = {};
const Op        = Sequelize.Op;

let dbconfig;
if (fs.existsSync('./config/local.js')) {
	dbconfig = require('../../config/local.js');
} else {
	dbconfig = require('../../config/travis.js');
}

// Define operator aliases here
const operatorsAliases = {

};

// Define database-configuration
const sequelize = new Sequelize(dbconfig.databasename, dbconfig.user, dbconfig.password, {
	host: dbconfig.host,
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		multipleStatements: true
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	timezone: 'Europe/Amsterdam',
	operatorsAliases: operatorsAliases
});

// Load all the models
fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(function(file) {
		let model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

// Create the foreign keys
Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate)
		db[modelName].associate(db);
});

// Create tables, if necessary
sequelize.sync();

// Export the db Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
