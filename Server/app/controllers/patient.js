const model = require('../models/');
const AuthCtrl = require('../controllers/auth.js');
const app = require('../../server.js');

//var PatientList;

module.exports.create = function (req, res, next) {
    //app.print('Attempting to create a patient');
    app.print(req.body);
    model.Patient.create(req.body).then(patient => {
        console.log('Created Patient');
        console.log(patient.get({ plain: true }));

        res.redirect('/');
    }, err => {
        app.print(err);
        res.redirect('/');
    });
};

var patientsList;

module.exports.getAllPatients = function (req, res, next) {
    app.print(req.session);
    //Check if user is authorized to render doctor page
    if(!AuthCtrl.isDoctor(req)) {
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
