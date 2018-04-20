const express = require('express');
const router = express.Router();


// controller
const AuthCtrl = require('../controllers/auth.js');
const PatientInfoCtrl = require('../controllers/patientinfo.js');
const PatientAllergyCtrl = require('../controllers/patientallergy.js');
const PatientCtrl = require('../controllers/patient.js');
const PatientDiagnosisCtrl = require('../controllers/patientdiagnosis.js');


// RESTful API

// Admin
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// Patient
router.get('/doctor', PatientCtrl.getAllPatients);
router.post('/createpatient', PatientCtrl.create);

// PatientInfo
router.post('/patientinfo', PatientInfoCtrl.create);
router.put('/patientinfo/:id', PatientInfoCtrl.edit);
router.delete('/patientinfo/:id', PatientInfoCtrl.delete);

// PatientAllergy
router.post('/patientallergy', PatientAllergyCtrl.create);
router.put('/patientallergy/:id', PatientAllergyCtrl.edit);
router.delete('/patientallergy/:id', PatientAllergyCtrl.delete);

// PatientDiagnosis
router.post('/patientdiagnosis', PatientDiagnosisCtrl.create);
router.put('/patientdiagnosis/:id', PatientDiagnosisCtrl.edit);
router.delete('/patientdiagnosis/:id', PatientDiagnosisCtrl.delete);

// TODO: put function in a controller
router.get('/home/:id', function(req, res) {
	res.sendFile('./views/home.html', { root: __dirname + "./../.." });
});

// Checks if user is admin
router.get('/admin', function (req, res) {
	if(!AuthCtrl.isAdmin(req)) {
		req.session.error = 'Only admins can access this page.';
		req.session.errorcode = 401;
		res.redirect('/error/');
	} 
	else
		res.render('admin');
});

router.get('/secretary', function (req, res) {
	res.render('patient');
})

// Sends user to index page and displays error message
router.get('/error', function (req, res) {
	if(req.session.error !== undefined) {
		res.status(req.session.errorcode);
		res.render('index', {
			status: req.session.error
		});
		delete req.session.error;
		delete req.session.errorcode;
	}
	else
		res.redirect('/');
});

// router.get('/doctor', function (req, res) {
	// 	console.log('Doctor logged in');
	// 	//res.sendFile('./views/doctor.pug', { root: __dirname + "./../.." });
	
// });

// frontend routes =========================================================
// route to handle all other requests
router.get('*', function(req, res) {
	res.render('index');
});



module.exports = router;
