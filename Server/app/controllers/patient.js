const model = require('../models/');
const AuthCtrl = require('../controllers/auth.js');
const app = require('../../server.js');
const Sequelize = require('sequelize');

//var PatientList;

module.exports.create = function (req, res, next) {
    //app.print('Attempting to create a patient');
    app.print(req.body);
    model.Patient.findOrCreate({
        where: {ssNbr: req.body.ssNbr},
        defaults: req.body
    }).spread((patient, created) => {
        if(created) {
            app.print('Created Patient');
            app.print(patient.get({ plain: true }));
            res.redirect('/');

        }
        else {
            app.print('Patient with this SSN already exists.');
            req.session.error = 'Patient with this SSN already exists.';
            req.session.errorcode = 400;
            res.redirect('/error/');
        }
    }, err => {
        app.print(err);
        res.redirect('/');
    });
};

var patientsList;

module.exports.getAllPatients = function (req, res, next) {
    app.print(req.session);
    //Check if user is authorized to render doctor page
    if(!AuthCtrl.isDoctor(req) && !AuthCtrl.isNurse(req)) {
        req.session.error = 'Only doctors can access this page.';
        req.session.errorcode = 403;
        res.redirect('/error/');
        return;
    }

    model.Patient.findAll({
        attributes: ['firstname', 'lastname'],
        limit: 5
    }).then(patients => {
        patients.forEach(p => {
            app.print(p.get({ plain: true }));

            patientsList = p;

        });
        res.render('doctor', {
            title: 'Patients',
            patients: patients});
    });
};


module.exports.getPatientData = function(req, res,next){
    // TODO - authentication

    model.Patient.findOne({
      where: {id: req.params.id},
      include: [
        {
          model: model.PatientInfo
        },
        {
          model: model.Diagnosis,
          include: [
            {
              model: model.DiagnosisType
            }
          ]
        },
        {
          model: model.Allergy,
          include: [
            {
              model: model.AllergyType
            }
          ]
        }
      ]
    }).then(patient => {
      //app.print(patient.get({plain:true}));

      res.render('patientprofile', {patient: patient});

    }, err => {

    });
};
