const express = require('express');
const router = express.Router();


// controller
const AuthCtrl = require('../controllers/auth.js');


// RESTful API
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);


// frontend routes =========================================================
// route to handle all Angular requests
router.get('*', function(req, res) {
	res.sendFile('./public/views/index.html', { root: __dirname + "./../.." });
});


module.exports = router;
