const model = require('../models/');

module.exports.create = function(req, res, next) {
	console.log('Trying to create a SecretaryInfo');
	console.log(req.body);
	model.Secretary.create(req.body)
	.then(info => {
		console.log('Created SecretaryInfo');
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
	console.log('Trying to update a SecretaryInfo');
	console.log(req.body);
	model.Secretary.update(req.body,{where: {id: req.params.id}})
	.then(info => {
		console.log('Updated SecretaryInfo');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.delete = function(req, res, next) {
	console.log('Trying to delete a SecretaryInfo');
	model.Secretary.destroy({where: {id: req.params.id}})
	.then(response => {
		console.log('Deleted SecretaryInfo');
		console.log(response);
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
