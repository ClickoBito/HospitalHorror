const model = require('../models/');

	console.log('Trying to create a Treatment');
	console.log(req.body);
	model.Treatment.create(req.body)//creating a treatment
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

module.exports.getTreatmentById = function(req, res, next) {
        // TODO: need to update which view that needs the treatment
        //res.render('treatment', {
    });
};

	console.log('Trying to update a Treatment');
	console.log(req.body);
	model.Treatment.update(req.body,{where: {id: req.body.id}})
		console.log('Updated Treatment');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};

	console.log('Trying to delete a Treatment');
	model.Treatment.destroy({where: {id: req.body.id}})
		console.log('Deleted Treatment');
		// TODO: redirect to some page
		res.redirect('/');
	}, err => {
		console.log(err);
		// TODO: redirect to error page e.g.
		res.redirect('/');
	});
};
