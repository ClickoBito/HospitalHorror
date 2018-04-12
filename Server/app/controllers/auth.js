const model = require('../models/');


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
			let userinfo = user.get({plain: true});
			if (userinfo.userType == 'Admin') 
				res.redirect('/admin/');
			else
				res.redirect('/home/'+ userinfo.id);

			console.log('User ' + userinfo.username + ' logged in at ' + Date());
		} else {
			console.log("Wrong login-credentials");
			// TODO: display error message in frontend
			res.redirect('/');
		}

	}).catch(err => {
		console.log("Error logging in");
		console.log(err);
		// TODO: display error message in frontend
		res.redirect('/');
	});
};


module.exports.register = function (req, res, next) {
	console.log(req.body);

	model.User.findOrCreate({
		where: {username: req.body.username},
		defaults: {password: req.body.password, userType: req.body.usertype}
	}).spread((user, created) => {
		//Check if user was created or if it already exists
		if (created) {
			//Check user type and create corresponding model
			if (req.body.usertype === 'Doctor') {
				model.Doctor.create({
					firstname: req.body.firstname, lastname: req.body.lastname,
					dateofbirth: req.body.dateofbirth, phone: req.body.phone,
					email: req.body.email, UserId: user.id
				}).then(doctor => {
					// let info = doctor.get({plain:true})
					console.log('Doctor created');
				})
			}

			else if (req.body.usertype === 'Nurse') {
				model.Nurse.create({
						firstname: req.body.firstname, lastname: req.body.lastname,
						dateofbirth: req.body.dateofbirth, phone: req.body.phone,
						email: req.body.email, UserId: user.id
					}).then(nurse => {
						// let info = nurse.get({plain:true})
						console.log('Nurse created');
					})
				}

			else {
				model.Secretary.create({
					firstname: req.body.firstname, lastname: req.body.lastname,
					dateofbirth: req.body.dateofbirth, phone: req.body.phone,
					email: req.body.email, UserId: user.id
				}).then(secretary => {
					// let info = secretary.get({plain:true})
					console.log('Secretary created');
				})
			}
			console.log('User successfully created');
			res.redirect('/');

		}
		else {
			console.log('User with this username already found');
			res.redirect('/');	
		}
	});
	
};

module.exports.logout = function(req, res, next) {
	req.session.destroy();
	res.status(200).send('Logout successful');
};
