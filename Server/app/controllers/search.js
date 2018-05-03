const _ = require('lodash');
const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const Op = Sequelize.Op;

export function search(req, res) {
    if (_.isEmpty(req.body) || !_.isString(req.body.search)) {
        return res.status(400).json({error: 'Invalid search body'});
    }
    Sequelize.Promise.all([
        model.Patient.findAll({
            where: {
                [Op.or]: [{firstname: req.body.search}, {lastname: req.body.search}]
            }
        }),
        model.Doctor.findAll({
            where: {
                [Op.or]: [{firstname: req.body.search}, {lastname: req.body.search}]
            }
        }),
        model.Nurse.findAll({
            where: {
                [Op.or]: [{firstname: req.body.search}, {lastname: req.body.search}]
            }
        }),
        model.Admin.findAll({
            where: {
                [Op.or]: [{firstname: req.body.search}, {lastname: req.body.search}]
            }
        }),
        model.Secretary.findAll({
            where: {
                [Op.or]: [{firstname: req.body.search}, {lastname: req.body.search}]
            }
        })
    ]).spread((patients, doctors, nurses, admins, secretaries) => {
        return res.status(200).json({
            resultCount: patients.length + doctors.length + nurses.length + admins.length + secretaries.length,
            patients,
            doctors,
            nurses,
            admins,
            secretaries
        });
    }, err => {
        app.print(err);
        res.status(500).send({ error: err.errors });
    });
}
