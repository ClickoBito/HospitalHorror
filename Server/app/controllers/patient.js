const model = require('../models/');

//var PatientList;                        

module.exports.create = function (req, res, next) {
    //console.log('Attempting to create a patient');
    console.log(req.body);
    model.Patient.create(req.body).then(patient => {
        console.log('Created Patient');
        console.log(info.get({ plain: true }));
        res.redirect('/');
    }, err => {
        console.log(err);
        res.redirect('/');
    });
};

var patientsList;

module.exports.getAllPatients = function (req, res, next) {
    model.Patient.findAll({
        attributes: ['firstname', 'lastname'],
        limit: 5
    }).then(patients => {
        patients.forEach(p => {
            console.log(p.get({ plain: true }));
            
            patientsList = p; 

        });
        res.render('doctor', {
            title: 'Patients', 
            patients: patients});
    });
};
