
module.exports.login = function(req, res, next) {
	res.status(200).send();
};

module.exports.logout = function(req, res, next) {
	req.session.destroy();
	res.status(200).send('Logout successful');
};
