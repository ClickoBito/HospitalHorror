const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const AuthCtrl = require('../controllers/auth.js');


module.exports.getDoctorDashboardData = function(req, res){
    if(!AuthCtrl.isDoctor(req) && !AuthCtrl.isNurse(req)) {
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
            attributes: ['firstname', 'lastname'],
            limit: 20
        }),
        model.PatientInfo.findAll({
            where: {PatientId: '1'},
            attributes: ['bloodpressure','weight','PatientId', 'createdAt', 'description'],
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
        });
        app.print('printing nurses ovject: ', nurses);
        nurses.forEach(n => {
            app.print('printing nurses', n.get({plain:true}));
        });
    }, err => {
        app.print(err);
        res.status(500).send({ error: err.errors });
    });
};
