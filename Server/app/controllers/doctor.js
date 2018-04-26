const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const AuthCtrl = require('../controllers/auth.js');

module.exports.getDoctorDashboardData = function(req, res){
    if(!AuthCtrl.isDoctor(req)) {
        req.session.error = 'Only doctors can access this page.';
        req.session.errorcode = 403;
        res.redirect('/error/');
        return;
    }

    Sequelize.Promise.all([
        model.Patient.findAll({
            attributes: ['firstname', 'lastname', 'id', 'dateofbirth'],
            limit: 20
        }),
        model.Nurse.findAll({
            attributes: ['firstname', 'lastname', 'UserId'],
            limit: 20,
            include: [
              {
                model: model.User
              }
            ]
        }),
        model.Doctor.findAll({
            attributes: ['firstname', 'lastname', 'UserId'],
            limit: 20,
            include: [
              {
                model: model.User
              }
            ]
        }),
        model.PatientInfo.findAll({
            where: {PatientId: '1'},
            attributes: ['bloodpressure','weight','PatientId', 'createdAt', 'description'],
          }),
        model.Doctor.findOne({
            where: {UserId: req.params.id},
            attributes: ['firstname', 'lastname']
        })
    ]).spread((patients, nurses, doctors, patientInfo, username) => {

        res.render('doctor', {
            patients: patients,
            nurses: nurses,
            doctors: doctors,
            patientInfo: patientInfo,
            username: username,
            onlineusers: online.getOnlineUsers
        });

    }, err => {
        app.print(err);
        res.status(500).send({ error: err.errors });
    });
};
