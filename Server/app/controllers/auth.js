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
		if (created) {
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
