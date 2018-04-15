const express = require('express');
const router = express.Router();


// controller
const AuthCtrl = require('../controllers/auth.js');
const PatientInfoCtrl = require('../controllers/patientinfo.js');
const PatientAllergyCtrl = require('../controllers/patientallergy.js');
const DoctorCtrl = require('../controllers/doctorinfo.js');
const NurseCtrl = require('../controllers/nurseinfo.js');
const SecretaryCtrl = require('../controllers/secretaryinfo.js');

// RESTful API

// Admin
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// PatientInfo
router.post('/patientinfo', PatientInfoCtrl.create);
router.put('/patientinfo/:id', PatientInfoCtrl.edit);
router.delete('/patientinfo/:id', PatientInfoCtrl.delete);

// PatientAllergy
router.post('/patientallergy', PatientAllergyCtrl.create);
router.put('/patientallergy/:id', PatientAllergyCtrl.edit);
router.delete('/patientallergy/:id', PatientAllergyCtrl.delete);

// Doctor
router.post('/doctorinfo', DoctorCtrl.create);
router.put('/doctorinfo/:id', DoctorCtrl.edit);
router.delete('/doctorinfo/:id', DoctorCtrl.delete);

// Nurse
router.post('/nurseinfo', NurseCtrl.create);
router.put('/nurseinfo/:id', NurseCtrl.edit);
router.delete('/nurseinfo/:id', NurseCtrl.delete);

// Secretary
router.post('/secretaryinfo', SecretaryCtrl.create);
router.put('/secretaryinfo/:id', SecretaryCtrl.edit);
router.delete('/secretaryinfo/:id', SecretaryCtrl.delete);
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
