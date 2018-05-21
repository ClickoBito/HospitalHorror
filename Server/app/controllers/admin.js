const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const AuthCtrl = require('../controllers/auth.js');

module.exports.createUser = function(req, res, next) {
	if(!AuthCtrl.isAdmin(req)) {
		req.session.error = 'Only admins can access this page.';
		req.session.errorcode = 401;
		res.redirect('/error/');
		return;
	}

	if(req.session.error != undefined) {
		let error = req.session.error;
		res.status(req.session.errorcode);
		req.session.error = undefined;
		req.session.errorcode = undefined;
		res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values, status: error});
	}
	else if (req.session.status) {
		let status = req.session.status;
		req.session.status = undefined;
		res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values, status: status});
	}
	else
		res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values});

};
