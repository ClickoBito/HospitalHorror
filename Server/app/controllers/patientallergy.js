const model = require('../models/');
const app = require('../../server.js');

module.exports.create = function(req, res, next) {
	app.print('Trying to create a patientAllegy');
	app.print(req.body);
	model.Allergy.create(req.body)
	.then(info => {
		app.print('Created PatientAllergy');
		app.print(info.get({plain:true}));
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
module.exports.edit = function(req, res, next) {
	app.print('Trying to update a PatientAllergy');
	app.print(req.body);
	model.Allergy.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		app.print('Updated PatientAllergy');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	app.print('Trying to delete a PatientAllergy');
	model.Allergy.destroy({where: {id: req.params.id}})
	.then(response => {
		app.print('Deleted PatientAllergy');
		app.print(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		app.print(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
