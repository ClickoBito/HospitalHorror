const model = require('../models/');

module.exports.create = function(req, res, next) {
	console.log('Trying to create a patientDiagnosis');
	console.log(req.body);
	model.Diagnosis.create(req.body)
	.then(info => {
		console.log('Created patientDiagnosis');
		console.log(info.get({plain:true}));
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
module.exports.edit = function(req, res, next) {
	console.log('Trying to update a patientDiagnosis');
	console.log(req.body);
	model.Diagnosis.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated patientDiagnosis');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a patientDiagnosis');
	model.Diagnosis.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted patientDiagnosis');
		console.log(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
