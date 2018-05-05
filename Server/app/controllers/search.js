const _ = require('lodash');
const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const Op = Sequelize.Op;

module.exports.search = function (req, res) {
    if (_.isEmpty(req.query) || !_.isString(req.query.search) || req.query.search.length === 0) {
        return res.status(400).json({error: 'Invalid search body'});
    }
    const urlQuery = req.query.search;
    if (req.query.diagnosis) {
        return diagnosisSearch(req, res, urlQuery);
    }
    personSearch(req, res, urlQuery);
};

function diagnosisSearch(req, res, urlQuery) {
    const diagnosisQuery = {
        where: {
            [Op.or]: [
                { '$Treatment.description$': {[Op.like]: '%' + urlQuery + '%' }},
                { '$DiagnosisType.name$': {[Op.like]: '%' + urlQuery + '%' }},
                { '$Treatment.TreatmentType.name$': {[Op.like]: '%' + urlQuery + '%' }}
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
}

function personSearch(req, res, urlQuery) {
    const personQuery = {
        where: {
            [Op.or]: [
                { firstname: {[Op.like]: urlQuery + '%' }},
                { lastname: {[Op.like]: urlQuery + '%' }}
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
}
