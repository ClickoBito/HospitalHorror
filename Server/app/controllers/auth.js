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
			res.render('index', {
				status: 'Username or password is wrong.'
			});
		}

	}, err => {
		console.log("Error logging in");
		console.log(err);
		res.render('index', {
			status: 'There was an error logging in, please try again later.'
		});
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
					// TODO: display error message in frontend
					res.redirect('/');
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
						// TODO: display error message in frontend
						res.redirect('/');
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
					// TODO: display error message in frontend
					res.redirect('/');
				});
			}
			// TODO: fix the correct redirect then render sth.
			// Don't try to send 2 responses
			//console.log('User successfully created');
			//res.render('index', {status: 'User successfully created.'});

		}
		else {
			console.log('User with this username already found');
			// TODO: need to redirect after a POST-request
			res.render('admin', {
				status: 'Username taken.'
			});
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
