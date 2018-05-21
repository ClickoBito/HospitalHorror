const model = require('../models/');
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
const NurseCtrl = require('../controllers/nurse.js');
const SearchCtrl = require('../controllers/search.js');


// RESTful API

// Admin
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);

// Patient
router.get('/patient/:id', PatientCtrl.getPatientData);
router.get('/doctor/:id', DoctorCtrl.getDashboard);
router.get('/createpatient/', PatientCtrl.createPatientForm);
router.post('/patient', PatientCtrl.create);

// Doctors
router.get('/doctor/:id', DoctorCtrl.getDashboard);
router.get('/doctorprofile/:id', DoctorCtrl.getDoctorProfile);

// Nurses
router.get('/nurse/:id', DoctorCtrl.getDashboard);
router.get('/nurseprofile/:id', NurseCtrl.getNurseProfile);

// PatientInfo
router.post('/patientinfo', formidable(), PatientInfoCtrl.create);
router.post('/patientinfo/:id', formidable(), PatientInfoCtrl.edit);
router.delete('/patientinfo/:id', PatientInfoCtrl.delete);
router.get('/patientinfo/:id', PatientInfoCtrl.get);

// PatientAllergy - not yet implemented in frontend
router.post('/patientallergy', PatientAllergyCtrl.create);
router.put('/patientallergy/:id', PatientAllergyCtrl.edit);
router.delete('/patientallergy/:id', PatientAllergyCtrl.delete);

// Treatment
router.post('/treatment', formidable(), TreatmentCtrl.createTreatment);
router.put('/treatment/:id', TreatmentCtrl.editTreatment);
router.delete('/treatment/:id', TreatmentCtrl.deleteTreatment);

// PatientDiagnosis
router.post('/patientdiagnosis', formidable(), PatientDiagnosisCtrl.create);
router.put('/patientdiagnosis/:id', PatientDiagnosisCtrl.edit);
router.delete('/patientdiagnosis/:id', PatientDiagnosisCtrl.delete);
router.get('/patientdiagnosis', TreatmentCtrl.getTreatmentDiagnosisData);

// TODO: require auth to search
router.get('/search', SearchCtrl.search);

// Admin-route
router.get('/admin', function (req, res) {
	if(!AuthCtrl.isAdmin(req)) {
		req.session.error = 'Only admins can access this page.';
		req.session.errorcode = 401;
		res.redirect('/error/');
	}
	else {
		if(req.session.error != undefined) {
			let error = req.session.error;
			res.status(req.session.errorcode);
			req.session.error = undefined;
			req.session.errorcode = undefined;
			res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values, status: error});
		}
		else if (req.session.status) {
			let status = req.session.status;
			req.session.status = undefined;
			res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values, status: status});

		}
		else
			res.render('admin', {speciality: model.Doctor.rawAttributes.speciality.values});

	}
});

// Error-route
router.get('/error', function (req, res) {
	if(req.session.error !== undefined) {
		let error = req.session.error;
		res.status(req.session.errorcode);
		req.session.error = undefined;
		req.session.errorcode = undefined;
		res.render('index', {
			status: error
		});
	}
	else
		res.redirect('/');
});

// frontend routes =========================================================
// route to handle all other requests
router.get('*', function(req, res) {
	if(req.session.status){
		let status = req.session.status;
		req.session.status = undefined;
		res.render('index', {
			status: status
		});
	}
	else
		res.render('index');
	req.session.status = undefined;
});


module.exports = router;
