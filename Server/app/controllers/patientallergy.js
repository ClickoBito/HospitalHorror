const model = require('../models/');

module.exports.create = function(req, res, next) {
	console.log('Trying to create a patientAllegy');
	console.log(req.body);
	model.Allergy.create(req.body)
	.then(info => {
		console.log('Created PatientAllergy');
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
	console.log('Trying to update a PatientAllergy');
	console.log(req.body);
	model.Allergy.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated PatientAllergy');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a PatientAllergy');
	model.Allergy.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted PatientAllergy');
		console.log(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
