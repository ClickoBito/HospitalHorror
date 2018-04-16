const model = require('../models/');

module.exports.getDoctorbyId = function (req, res, next) {
    model.Patient.findById(doctorId).then(doctor => {
        console.log('The doctor fetched is: ', doctor)
        res.render('doctor', {
            
            doctor: doctor});
    });
};
