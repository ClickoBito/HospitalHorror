const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');

module.exports.createTreatment = function(req, res, next) { // create is a function in a sequelize
	app.print('Trying to create a treatment');
	app.print(req.fields);
	model.Treatment.create(req.fields)//creating a treatment
	.then(response => {
		app.print('Created treatment');
		app.print(response.get({plain:true}));
		res.redirect('/patient/'+req.fields.PatientId);
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/error/');
	});
};

module.exports.editTreatment = function(req, res, next) {
	model.Treatment.update(req.body,{where: {id: req.params.id}})
	.then(response => {
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/error/');
	});
};

module.exports.deleteTreatment = function(req, res, next) {
	model.Treatment.destroy({where: {id: req.params.id}})
	.then(response => {
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
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
					res.status(500).send({ error: err.errors });
	});
};
