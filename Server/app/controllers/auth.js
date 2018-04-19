const model = require('../models/');
const controller = require('../controllers/patient.js');

module.exports.login = function(req, res, next) {
	// debug
	console.log(req.body);
	model.User.findOne({
		where: {
			username: req.body.username,
			password: req.body.password
		}
	}).then(user => {

		if (user) {
			// set the session cookie
			req.session.user = user;

			let userinfo = user.get({plain: true});

			if (userinfo.userType === 'Admin')
				res.redirect('/admin/');
			else if (userinfo.userType === 'Doctor') {
				// controller.getAllPatients;
				res.redirect('/doctor/');
			}
		} else {
			console.log("Wrong login-credentials");
			// TODO: display error message in frontend
			req.session.error = 'Username or password is wrong.'
			res.redirect('/error/');
		}

	}, err => {
		console.log("Error logging in");
		console.log(err);
		req.session.error = 'There was an error logging in. Please try again later.'
		res.redirect('/error/');
	});
};


module.exports.register = function (req, res, next) {
	// TODO: display error message
	if (!isAdmin(req))
		res.redirect('/');

	model.User.findOrCreate({
		where: {username: req.body.username},
		defaults: {password: req.body.password, userType: req.body.usertype}
	}).spread((user, created) => {
		//Check if user was created or if it already exists
		if (created) {
			console.log('User successfully created');

			//Check user type and create corresponding model
			if (req.body.usertype === 'Doctor') {
				model.Doctor.create({
					firstname: req.body.firstname, lastname: req.body.lastname,
					dateofbirth: req.body.dateofbirth, phone: req.body.phone,
					email: req.body.email, UserId: user.id
				}).then(doctor => {
					// let info = doctor.get({plain:true})
					console.log('Doctor created');
					// TODO: redirect to appropriate page
					res.redirect('/');
				}, err => {
					console.log(err);
					req.session.error = 'There was an error creating your account. Please try again later.'
					res.redirect('/error/');
				});
			}

			else if (req.body.usertype === 'Nurse') {
				model.Nurse.create({
						firstname: req.body.firstname, lastname: req.body.lastname,
						dateofbirth: req.body.dateofbirth, phone: req.body.phone,
						email: req.body.email, UserId: user.id
					}).then(nurse => {
						// let info = nurse.get({plain:true})
						console.log('Nurse created');
						// TODO: redirect to appropriate page
						res.redirect('/');
					}, err => {
						console.log(err);
						req.session.error = 'There was an error creating your account. Please try again later.'
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
					console.log('Secretary created');
					// TODO: redirect to appropriate page
					res.redirect('/');
				}, err => {
					console.log(err);
					req.session.error = 'There was an error creating your account. Please try again later.'
					res.redirect('/error/');
				});
			}

		}
		else {
			console.log('User with this username already found');
			// TODO: need to redirect after a POST-request
			req.session.error = 'Username taken. Please try something else.'
			res.redirect('/error/');
		}
	});

};

module.exports.logout = function(req, res, next) {
	res.clearCookie('connect.sid');
	req.session.destroy();
	res.status(200).send('Logout successful');
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
