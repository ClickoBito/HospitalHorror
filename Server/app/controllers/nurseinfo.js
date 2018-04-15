const model = require('../models/');

module.exports.create = function(req, res, next) {
	console.log('Trying to create a NurseInfo');
	console.log(req.body);
	model.Nurse.create(req.body)
	.then(info => {
		console.log('Created NurseInfo');
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
	console.log('Trying to update a NurseInfo');
	console.log(req.body);
	model.Nurse.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated NurseInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a NurseInfo');
	model.Nurse.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted NurseInfo');
		console.log(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
