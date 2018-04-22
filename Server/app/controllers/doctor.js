const model = require('../models/');
const app = require('../../server.js');

module.exports.getDoctorbyId = function (req, res, next) {
    model.Patient.findById(doctorId).then(doctor => {
        app.print('The doctor fetched is: ', doctor);
        res.render('doctor', {

            doctor: doctor});
    });
};
