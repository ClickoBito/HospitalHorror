const model = require('../models');
const app = require('../../server.js');
const AuthCtrl = require('../controllers/auth.js');

module.exports.getNurseProfile = function(req, res, next) {
	if(!AuthCtrl.isDoctor(req) && !AuthCtrl.isNurse(req)) {
			req.session.error = 'Only doctors & nurses can access this page.';
			req.session.errorcode = 403;
			res.redirect('/error/');
			return;
	}

	model.Nurse.findOne({
		where: {id: req.params.id},
	}).then(nurse => {
		res.render('nurseprofile', {nurse: nurse});
	}, err => {
		app.print(err);
		app.print("Internal Server Error");
		req.session.error = 'Internal Server Error.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};
