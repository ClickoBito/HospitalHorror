const model = require('../models/');

module.exports.createTreatment = function(req, res, next) { // create is a function in a sequelize
	console.log('Trying to create a Treatment');
	console.log(req.body);
	model.Treatment.create(req.body)//creating a treatment
	.then(response => {
		console.log('Trying to create a Treatment');
		console.log(response.get({plain:true}));
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.getTreatmentById = function(req, res, next) {
	model.Treatment.findById(req.body.id).then(response => {
        console.log('The treatment fetched is: ', response.get({plain:true}));
        // TODO: need to update which view that needs the treatment
        //res.render('treatment', {
        //   treatment: response});
    });
};

module.exports.editTreatmentById = function(req, res, next) {
	console.log('Trying to update a Treatment');
	console.log(req.body);
	model.Treatment.update(req.body,{where: {id: req.body.id}})
	.then(response => {
		console.log('Updated Treatment');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.deleteTreatmentById = function(req, res, next) {
	console.log('Trying to delete a Treatment');
	model.Treatment.destroy({where: {id: req.body.id}})
	.then(response => {
		console.log('Deleted Treatment');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};