const express = require('express');
const router = express.Router();


// controller
const AuthCtrl = require('../controllers/auth.js');
const PatientInfoCtrl = require('../controllers/patientinfo.js');


// RESTful API

// Admin
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// PatientInfo
router.post('/patientinfo', PatientInfoCtrl.create);
router.put('/patientinfo', PatientInfoCtrl.edit);
router.delete('/patientinfo', PatientInfoCtrl.delete);


// TODO: put function in a controller
router.get('/home/:id', function(req, res) {
	res.sendFile('./views/home.html', { root: __dirname + "./../.." });
});

router.get('/admin', function (req, res) {
	console.log('Admin logged in');
	res.sendFile('./views/admin.html', { root: __dirname + "./../.." });
});

// frontend routes =========================================================
// route to handle all other requests
router.get('*', function(req, res) {
	res.sendFile('./views/index.html', { root: __dirname + "./../.." });
});


module.exports = router;
