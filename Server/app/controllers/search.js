const _ = require('lodash');
const model = require('../models/');
const Sequelize = require('sequelize');
const app = require('../../server.js');
const online = require('./online.js');
const Op = Sequelize.Op;

module.exports.search = function (req, res) {
    // Conditional html or json response for testing purpose
    let responseHandler = req.body.json ? respondJSON : respondHTML;
    // If search query missing return 400 bad request
    if (_.isEmpty(req.query) || !_.isString(req.query.search) || req.query.search.length === 0) {
        return responseHandler(res, {error: 'Invalid search body'}, 400);
    }
    const urlQuery = req.query.search.trim();
    if (req.query.diagnosis) {
        return diagnosisSearch(req, res, urlQuery, responseHandler);
    }
    personSearch(req, res, urlQuery, responseHandler);
};

function diagnosisSearch(req, res, urlQuery, responseHandler) {
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
        const result = {
            resultCount: diagnoses.length,
            diagnoses
        };
        responseHandler(res, result);
    }, err => {
        app.print(err);
        responseHandler(res, { error: err.errors }, 500);
    });
}

function personSearch(req, res, urlQuery, responseHandler) {
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
        const result = {
            resultCount: patients.length + doctors.length + nurses.length + admins.length + secretaries.length,
            patients,
            doctors,
            nurses,
            admins,
            secretaries
        };
        responseHandler(res, result);
    }, err => {
        app.print(err);
        responseHandler(res, { error: err.errors }, 500);
    });
}

function respondJSON(res, result, status = 200) {
    res.status(status).json(result);
}

function respondHTML(res, result, status = 200) {
    if (result.error || status != 200) {
        // TODO handle HTML error response
    }
    res.render('searchResult', {searchResult: result});
}
