const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');

module.exports.createTreatment = function(req, res, next) { // create is a function in a sequelize
	app.print('Trying to create a treatment');
	model.Treatment.create(req.fields)//creating a treatment
	.then(response => {
		app.print('Created treatment');
		res.redirect('/patient/'+req.fields.PatientId);
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};

module.exports.editTreatment = function(req, res, next) {
	model.Treatment.update(req.body,{where: {id: req.params.id}})
	.then(response => {
		res.redirect('/');
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};

module.exports.deleteTreatment = function(req, res, next) {
	model.Treatment.destroy({where: {id: req.params.id}})
	.then(response => {
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

module.exports.getTreatmentDiagnosisData = function(req, res, next){
	let userId = req.session.user.id;
	let dataArray = [];
	Sequelize.Promise.all([
		model.Treatment.findAll(),
		model.TreatmentType.findAll(),
		model.Diagnosis.findAll(),
		model.DiagnosisType.findAll(),
		model.Doctor.findOne({
			where: {UserId: userId},
			attributes: ['firstname', 'lastname', 'id']
		})
	]).spread((treatment, treatmentType, diagnosis, diagnosisType, doctorId) => {

		let data = {
			treatment: treatment,
			treatmentType: treatmentType,
			diagnosis: diagnosis,
			diagnosisType: diagnosisType,
			doctorId: doctorId
		};

		res.json(data);
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};
