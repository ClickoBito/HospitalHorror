const express = require('express');
const router = express.Router();
const app = require('../../server.js');
const formidable = require('express-formidable');


// controller
const AuthCtrl = require('../controllers/auth.js');
const PatientInfoCtrl = require('../controllers/patientinfo.js');
const PatientAllergyCtrl = require('../controllers/patientallergy.js');
const TreatmentCtrl = require('../controllers/treatment.js');
const PatientCtrl = require('../controllers/patient.js');
const PatientDiagnosisCtrl = require('../controllers/patientdiagnosis.js');
const DoctorCtrl = require('../controllers/doctor.js');

// RESTful API

// Admin
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// Patient
router.get('/patient/:id', PatientCtrl.getPatientData);
router.get('/doctor/:id', DoctorCtrl.getDashboard);
router.get('/createpatient', PatientCtrl.createPatientForm);
router.post('/patient', PatientCtrl.create);

// Doctors
router.get('/doctor/:id', DoctorCtrl.getDashboard);

// Nurses
router.get('/nurse/:id', DoctorCtrl.getDashboard);

// PatientInfo
router.post('/patientinfo', formidable(), PatientInfoCtrl.create);
router.post('/patientinfo/:id', formidable(), PatientInfoCtrl.edit);
router.delete('/patientinfo/:id', PatientInfoCtrl.delete);
router.get('/patientinfo/:id', PatientInfoCtrl.get);

// PatientAllergy
router.post('/patientallergy', PatientAllergyCtrl.create);
router.put('/patientallergy/:id', PatientAllergyCtrl.edit);
router.delete('/patientallergy/:id', PatientAllergyCtrl.delete);

// Treatment
router.post('/treatment', TreatmentCtrl.createTreatment);
router.put('/treatment/:id', TreatmentCtrl.editTreatment);
router.delete('/treatment/:id', TreatmentCtrl.deleteTreatment);
//TODO: Check if this statement is required
//router.get('/treatment/:id', TreatmentCtrl.getTreatment);

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

// Sends user to index page and displays error message
router.get('/error', function (req, res) {
	if(req.session.error !== undefined) {
		res.status(req.session.errorcode);
		res.render('index', {
			status: req.session.error
		});
		req.session.error = undefined;
		req.session.errorcode = undefined;
	}
	else
		res.redirect('/');
});

// router.get('/doctor', function (req, res) {
	// 	app.print('Doctor logged in');
	// 	//res.sendFile('./views/doctor.pug', { root: __dirname + "./../.." });

// });

// frontend routes =========================================================
// route to handle all other requests
router.get('*', function(req, res) {
	res.render('index');
});



module.exports = router;
