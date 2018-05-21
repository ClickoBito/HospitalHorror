const model = require('../models/');
const app = require('../../server.js');

module.exports.create = function(req, res, next) {
	app.print('Trying to create a patient diagnosis');
	app.print(req.fields);
	model.Diagnosis.create(req.fields)
	.then(info => {
		app.print('Created patient diagnosis');
		res.redirect('/patient/' + info.PatientId);
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};

module.exports.edit = function(req, res, next) {
	app.print('Trying to update a patientDiagnosis');
	app.print(req.body);
	model.Diagnosis.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		app.print('Updated patientDiagnosis');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};

module.exports.delete = function(req, res, next) {
	app.print('Trying to delete a patientDiagnosis');
	model.Diagnosis.destroy({where: {id: req.params.id}})
	.then(response => {
		app.print('Deleted patientDiagnosis');
		app.print(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};
