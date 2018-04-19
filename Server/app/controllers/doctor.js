const model = require('../models/');
const Sequelize = require('sequelize');

module.exports.getDoctorDashboardData = function(req, res){
    Sequelize.Promise.all([
        model.Patient.findAll({
            attributes: ['firstname', 'lastname'],
            limit: 20
        }),
        model.Nurse.findAll({
            attributes: ['firstname', 'lastname'],
            limit: 20
        }),
        model.PatientInfo.findOne({
            where: {PatientId: '1'},
            attributes: ['bloodpressure','weight','PatientId'],
          }),
        model.Doctor.findOne({
            where: {UserId: req.params.id},
            attributes: ['firstname', 'lastname']
        })
    ]).spread((patients, nurses, patientInfo, username) => {
        res.render('doctor', {
            patients: patients,
            nurses: nurses,
            patientInfo: patientInfo,
            username: username
        })
        console.log('printing nurses ovject: ', nurses)
        nurses.forEach(n => {
            console.log('printing nurses', n.get({plain:true}));
        });
    }, err => {
        console.log(err);
        res.status(500).send({ error: err.errors });
    });
}
