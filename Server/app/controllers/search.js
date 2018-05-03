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
    const personQuery = {
        [Op.or]: [
            {firstname: {[Op.like]: req.body.search + '%'}},
            {lastname: {[Op.like]: req.body.search + '%'}}],
    };
    Sequelize.Promise.all([
        model.Patient.findAll({
            where: personQuery,
            limit: 20
        }),
        model.Doctor.findAll({
            where: personQuery,
            limit: 20
        }),
        model.Nurse.findAll({
            where: personQuery,
            limit: 20
        }),
        model.Admin.findAll({
            where: personQuery,
            limit: 20
        }),
        model.Secretary.findAll({
            where: personQuery,
            limit: 20
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
