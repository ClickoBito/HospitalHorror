const model = require('../models/');

module.exports.create = function(req, res, next) {
	console.log('Trying to create a DoctorInfo');
	console.log(req.body);
	model.Doctor.create(req.body)
	.then(info => {
		console.log('Created DoctorInfo');
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
	console.log('Trying to update a DoctorInfo');
	console.log(req.body);
	model.Doctor.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated DoctorInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a DoctorInfo');
	model.Doctor.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted DoctorInfo');
		console.log(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
