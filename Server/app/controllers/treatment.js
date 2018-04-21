const model = require('../models/');

module.exports.createTreatment = function(req, res, next) { // create is a function in a sequelize
	model.Treatment.create(req.body)//creating a treatment
	.then(response => {
		// TODO: redirect to some page
		res.redirect('/');
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

/*
// TODO: Update if this is needed or not
// Unsure if this will be used later

module.exports.getTreatment = function(req, res, next) {
	model.Treatment.findById(req.params.id).then(response => {
		//console.log(response);
		let data = {
			treatment: response
		};
		res.json(data);
		//console.log('The treatment fetched is: ', response.get({plain:true}));
        //    res.render('treatment', {
        //    treatment: response});
    });
};
*/