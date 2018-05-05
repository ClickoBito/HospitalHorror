const _ = require('lodash');
const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const Op = Sequelize.Op;

export const search = (req, res) => {
    if (_.isEmpty(req.body) || !_.isString(req.body.search)) {
        return res.status(400).json({error: 'Invalid search body'});
    }
    if (req.body.diagnosis) {
        return diagnosisSearch(req, res);
    }
    personSearch(req, res);
};

const diagnosisSearch = (req, res) => {
    const diagnosisQuery = {
        where: {
            [Op.or]: [
                { '$Treatment.description$': {[Op.like]: '%' + req.body.search + '%' }},
                { '$DiagnosisType.name$': {[Op.like]: '%' + req.body.search + '%' }},
                { '$Treatment.TreatmentType.name$': {[Op.like]: '%' + req.body.search + '%' }}
            ]
        },
        include: [
            {
                model: model.Treatment,
                include: [{ model: model.TreatmentType }]
            },
            { model: model.DiagnosisType }
        ],
        limit: 20
    };
    model.Diagnosis.findAll(diagnosisQuery).then((diagnoses) => {
        return res.status(200).json({
            resultCount: diagnoses.length,
            diagnoses
        });
    }, err => {
        app.print(err);
        res.status(500).send({ error: err.errors });
    });
};

const personSearch = (req, res) => {
    const personQuery = {
        where: {
            [Op.or]: [
                { firstname: {[Op.like]: req.body.search + '%' }},
                { lastname: {[Op.like]: req.body.search + '%' }}
        ]},
        limit: 20
    };
    Sequelize.Promise.all([
        model.Patient.findAll(personQuery),
        model.Doctor.findAll(personQuery),
        model.Nurse.findAll(personQuery),
        model.Admin.findAll(personQuery),
        model.Secretary.findAll(personQuery)
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
};
