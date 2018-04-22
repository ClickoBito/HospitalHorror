const model = require('../models/');
const app = require('../../server.js');

module.exports.create = function(req, res, next) { // create is a function in a sequelize
	app.print('Trying to create a PatientInfo');
	app.print(req.body);
	model.PatientInfo.create(req.body)//creating a patientinfo
	.then(info => {
		app.print('Created PatientInfo');
		app.print(info.get({plain:true}));// redirecting info
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.edit = function(req, res, next) {
	app.print('Trying to update a PatientInfo');
	app.print(req.body);
	model.PatientInfo.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		app.print('Updated PatientInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	app.print('Trying to delete a PatientInfo');
	model.PatientInfo.destroy({where: {id: req.params.id}})
	.then(response => {
		app.print('Deleted PatientInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
