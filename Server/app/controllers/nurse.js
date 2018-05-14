const model = require('../models');
const app = require('../../server.js');

module.exports.getNurseProfile = function(req, res, next) {
	// TODO - authentication
	model.Nurse.findOne({
		where: {id: req.params.id},
	}).then(nurse => {
		res.render('nurseprofile', {nurse: nurse});
	}, err => {
		// TODO
	});
};
