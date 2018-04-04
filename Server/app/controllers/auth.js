const model = require('../models/');




module.exports.login = function(req, res, next) {
	//res.status(200).send();
	console.log("test");
	model.User.findOne({
		where: {
			username: req.body.userid,
			password: req.body.pwd
		}
	}).then(user => {
		const userinfo = user.get({plain: true});
		console.log(userinfo);
		if (!user) {
			console.log("error");
		} else {
			
			res.redirect('/home/'+ userinfo.id);

		}
		
	});
};

module.exports.logout = function(req, res, next) {
	req.session.destroy();
	res.status(200).send('Logout successful');
};
