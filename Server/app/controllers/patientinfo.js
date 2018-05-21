const model = require('../models/');
const app = require('../../server.js');

module.exports.create = function(req, res, next) { // create is a function in a sequelize
	app.print('Trying to create a PatientInfo');
	model.PatientInfo.create(req.fields)//creating a patientinfo
	.then(info => {
		app.print('Created PatientInfo');
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
	app.print('Trying to update a PatientInfo');
	model.PatientInfo.update(req.fields,{where: {id: req.params.id}})
	.then(info => {
		app.print('Updated PatientInfo');
		res.redirect('/patient/' + req.fields.PatientId);
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
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
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};

module.exports.get = function(req, res, next){
	model.PatientInfo.findOne({
		where: {id: req.params.id}
	}).then(patientinfo =>{
		res.json({patientinfo});
	});
};
