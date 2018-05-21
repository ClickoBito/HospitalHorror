const model = require('../models/');
const controller = require('../controllers/patient.js');
const bCrypt= require('bcryptjs');
const app = require('../../server.js');
const online = require('./online.js');

module.exports.login = function(req, res, next) {
	model.User.findOne({
		where: {
			username: req.body.username
		}
		}).then(user => {
			if (user) {
				//Check password
				bCrypt.compare(req.body.password, user.password, function(err, matches) {
					if(matches) {
						req.session.user = user;
						let userinfo = user.get({plain: true});
						req.session.userid = userinfo.id;
						online.addUser(userinfo.id);
						if (userinfo.userType === 'Admin')
							res.redirect('/admin/');
						else if (userinfo.userType === 'Doctor')
							res.redirect('/doctor/' + userinfo.id);
						else if (userinfo.userType === 'Nurse')
							res.redirect('/nurse/' + userinfo.id);
						else
							res.redirect('/createpatient/');
					}
					else {
						app.print("Wrong login-credentials");
						req.session.error = 'Username or password is wrong.';
						req.session.errorcode = 401;
						res.redirect('/error/');
					}
				});
			}
			else {
				app.print("Wrong login-credentials");
				req.session.error = 'Username or password is wrong.';
				req.session.errorcode = 401;
				res.redirect('/error/');
			}

	}, err => {
		app.print("Error logging in");
		app.print(err);
		req.session.error = 'There was an error logging in. Please try again later.';
		req.session.errorcode = 500;
		res.redirect('/error/');
	});
};


module.exports.register = function (req, res, next) {
	if (!isAdmin(req)) {
		req.session.error = 'Admin privileges not found. User not created.';
		req.session.errorcode = 403;
		res.redirect('/error/');
		return;
	}

	model.User.findOrCreate({
		where: {username: req.body.username},
		defaults: {password: encryptPassword(req.body.password), userType: req.body.usertype}
	}).spread((user, created) => {
		//Check if user was created or if it already exists
		if (created) {
			//Check user type and create corresponding model
			if (req.body.usertype === 'Doctor') {
				model.Doctor.create({
					firstname: req.body.firstname, lastname: req.body.lastname,
					dateofbirth: req.body.dateofbirth, phone: req.body.phone,
					email: req.body.email, image: req.body.image, UserId: user.id
				}).then(doctor => {
					app.print('Doctor created');
					req.session.status = 'Doctor created.';
					res.redirect('/admin');
				}, err => {
					app.print(err);
					req.session.error = 'There was an error creating your account. Please try again later.';
					req.session.errorcode = 500;
					res.redirect('/error/');
				});
			}

			else if (req.body.usertype === 'Nurse') {
				model.Nurse.create({
						firstname: req.body.firstname, lastname: req.body.lastname,
						dateofbirth: req.body.dateofbirth, phone: req.body.phone,
						email: req.body.email, UserId: user.id
					}).then(nurse => {
						app.print('Nurse created');
						req.session.status = 'Nurse created.';
						res.redirect('/admin');
					}, err => {
						app.print(err);
						req.session.error = 'There was an error creating your account. Please try again later.';
						req.session.errorcode = 500;
						res.redirect('/error/');
					});
				}

			else {
				model.Secretary.create({
					firstname: req.body.firstname, lastname: req.body.lastname,
					dateofbirth: req.body.dateofbirth, phone: req.body.phone,
					email: req.body.email, UserId: user.id
				}).then(secretary => {
					// let info = secretary.get({plain:true})
					app.print('Secretary created');
					req.session.status = 'Secretary created.';
					res.redirect('/admin');
				}, err => {
					app.print(err);
					req.session.error = 'There was an error creating your account. Please try again later.';
					req.session.errorcode = 500;
					res.redirect('/error/');
				});
			}

		}
		else {
			app.print('User with this username already found');
			req.session.error = 'Username taken. Please try something else.';
			req.session.errorcode = 400;
			res.redirect('/admin/');
		}
	});

};

module.exports.logout = function(req, res, next) {
	res.clearCookie('connect.sid');
	if (req.session.user)
		online.deleteUser(req.session.user.id);
	req.session.destroy();
	res.redirect('/');
};

function isAdmin(req) {
	return req.session.user && req.session.user.userType === 'Admin';
}
module.exports.isAdmin = isAdmin;

function isDoctor(req) {
	return req.session.user && req.session.user.userType === 'Doctor';
}
module.exports.isDoctor = isDoctor;

function isNurse(req) {
	return req.session.user && req.session.user.userType === 'Nurse';
}
module.exports.isNurse = isNurse;

function isSecretary(req) {
	return req.session.user && req.session.user.userType === 'Secretary';
}
module.exports.isSecretary = isSecretary;

function encryptPassword(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}
module.exports.encryptPassword = encryptPassword;
