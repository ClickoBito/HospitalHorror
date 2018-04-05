const express = require('express');
const router = express.Router();


// controller
const AuthCtrl = require('../controllers/auth.js');


// RESTful API
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// TODO: put function in a controller
router.get('/home/:id', function(req, res) {
	res.sendFile('./public/views/home.html', { root: __dirname + "./../.." });
});

// frontend routes =========================================================
// route to handle all other requests
router.get('*', function(req, res) {
	res.sendFile('./public/views/index.html', { root: __dirname + "./../.." });
});


module.exports = router;
