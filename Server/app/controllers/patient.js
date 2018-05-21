const model = require('../models/');
const AuthCtrl = require('../controllers/auth.js');
const app = require('../../server.js');
const Sequelize = require('sequelize');

//var PatientList;

module.exports.create = function (req, res, next) {
    //app.print('Attempting to create a patient');
    model.Patient.findOrCreate({
        where: {ssNbr: req.body.ssNbr},
        defaults: req.body
    }).spread((patient, created) => {
        if(created) {
            app.print('Created Patient');
            if (AuthCtrl.isSecretary(req)) {
                req.session.status = 'Patient created.';
                res.redirect('/createpatient');
            }
            else if (AuthCtrl.isDoctor(req))
                res.redirect('/doctor/' + req.session.userid);
            else
                res.redirect('/nurse/' + req.session.userid);

        }
        else {
            app.print('Patient with this SSN already exists.');
            req.session.error = 'Patient with this SSN already exists.';
            req.session.errorcode = 400;
            res.redirect('/error/');
        }
    }, err => {
        app.print(err);
        app.print("Internal Server Error");
        req.session.error = 'Internal Server Error.';
        req.session.errorcode = 500;
        res.redirect('/error/');
    });
};

var patientsList;

module.exports.getAllPatients = function (req, res, next) {
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
            patientsList = p;
        });
        res.render('doctor', {
            title: 'Patients',
            patients: patients});
    }, err => {
        app.print(err);
        app.print("Internal Server Error");
        req.session.error = 'Internal Server Error.';
        req.session.errorcode = 500;
        res.redirect('/error/');
    });
};


module.exports.getPatientData = function(req, res,next){
    if(!AuthCtrl.isDoctor(req) && !AuthCtrl.isNurse(req)) {
        req.session.error = 'Only doctors can access this page.';
        req.session.errorcode = 403;
        res.redirect('/error/');
        return;
    }

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
        },
        {
          model: model.Doctor
        }
      ]
    }).then(patient => {
        res.render('patientprofile', {patient: patient, user: req.session.user});

    }, err => {
        app.print(err);
        app.print("Internal Server Error");
        req.session.error = 'Internal Server Error.';
        req.session.errorcode = 500;
        res.redirect('/error/');
    });
};

module.exports.createPatientForm = function(req, res, next) {
  if (!req.session.user) {
      app.print('Can\'t access CreatePatient-form - Not logged in.');
      req.session.error = 'Not logged in.';
      req.session.errorcode = 400;
      res.redirect('/error/');
      return;
  }

  let usertype = req.session.user.userType;
  let typemodel;
  if (usertype === 'Doctor')
    typemodel = model.Doctor;
  else if (usertype === 'Nurse')
    typemodel = model.Nurse;
  else
    typemodel = model.Secretary;

  Sequelize.Promise.all([
      model.Doctor.findAll({
        attributes: ['id', 'firstname', 'lastname'],
      }),
      typemodel.findOne({
        where: { UserId: req.session.userid },
        attributes: ['firstname', 'lastname']
      })
  ]).spread((doctors, username) => {
    let status;
    if (req.session.status) {
      status = req.session.status;
      req.session.status = undefined;
    } else
      status = undefined;

    res.render('createpatient', {
      doctors: doctors,
      username: username,
      status: status
    });
  }, err => {
    app.print(err);
    app.print("Internal Server Error");
    req.session.error = 'Internal Server Error.';
    req.session.errorcode = 500;
    res.redirect('/error/');
  });
};
