const model = require('../models/');

module.exports.create = function(req, res, next) { // create is a function in a sequelize
	console.log('Trying to create a PatientInfo');
	console.log(req.body);
	model.PatientInfo.create(req.body)//creating a patientinfo
	.then(info => {
		console.log('Created PatientInfo');
		console.log(info.get({plain:true}));// redirecting info
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.edit = function(req, res, next) {
	console.log('Trying to update a PatientInfo');
	console.log(req.body);
	model.PatientInfo.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated PatientInfo');
		console.log(info.get({plain:true}));// redirecting info
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a PatientInfo');
	model.PatientInfo.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted PatientInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
