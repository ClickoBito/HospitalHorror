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
			console.log('User ' + userinfo.username + ' logged in at ' + Date());
			res.redirect('/home/'+ userinfo.id);
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

module.exports.logout = function(req, res, next) {
	req.session.destroy();
	res.status(200).send('Logout successful');
};
