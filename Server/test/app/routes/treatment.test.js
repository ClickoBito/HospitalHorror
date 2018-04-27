import _ from 'lodash';
import supertest from 'supertest';
import app from '../../../server';
import each from 'async/each';

const should = require('chai').should();
const model = require('../../../app/models/');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

describe('Test of creating treatments', function() {
    beforeEach(function (done) {
        // Create 5 treatments and store them in the database
        var treatments = [
            {description: 'Treatment 1 created', TreatmentTypeId: '2'},
            {description: 'Treatment 2 created', TreatmentTypeId: '2'},
            {description: 'Treatment 3 created', TreatmentTypeId: '2'},
            {description: 'Treatment 4 created', TreatmentTypeId: '2'},
            {description: 'Treatment 5 created', TreatmentTypeId: '2'}
        ];
        each(treatments, function(treatment, callback) {
            supertest(app)
                .post('/treatment')
                .send(treatment)
                .expect(302)
                .end((err, res) => {
                    should.not.exist(err);
                    callback();
                });
        }, function(err) {
            should.not.exist(err);
            done();
        });
    });
    afterEach(function (done) {
        // Remove the 5 treatments that have been used for the tests
        model.Treatment.findAll({
            limit: 5,
            where: {
            },
            order: [['createdAt', 'DESC'], ['id', 'DESC']]
        }).then(function(treatments) {
            model.Treatment.destroy({
                where: {
                    [Op.or]: [{id: treatments[0].id},{id: treatments[1].id}, 
                    {id: treatments[2].id}, {id: treatments[3].id}, {id: treatments[4].id}]
                }
            }).then(function(){
                done();
            });
        });
    });
    it('Checks if the 5 treatments has the correct content', function (done) {
        // Get latest created entries in treatment table
        model.Treatment.findAll({
        limit: 5,
        where: {
        },
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
        }).then(function(treatments) {
            for(var i=0; i<5; i++){
                treatments[i].description.should.match(/Treatment \d created/);
                treatments[i].TreatmentTypeId.should.equal(2);
            }
            done();
        });
    });
    it('Check if the treatments have the correct ids', function(done) {
        // Get the 5 latest created entries in treatment table
        model.Treatment.findAll({
            limit: 5,
            where: {
            },
            order: [['createdAt', 'DESC'], ['id', 'DESC']]
        }).then(function(treatments) {
            for(var j=0; j<4; j++){
                // Check if all ids' are different and if every id is increased by 1 after creating a treatment
                (treatments[j].id-treatments[j+1].id).should.equal(1);
            }
            done();
        });
    });
});

describe('Test of editing a treatment', function() {
    beforeEach(function (done) {
        var data = {description: 'Treatment created', TreatmentTypeId: '2'};
        model.Treatment.create(data)//creating a treatment
	    .then(response => {
            done();
	    });
    });
    afterEach(function (done) {
        // Remove the treatment that has been used for tests
        model.Treatment.findAll({
            limit: 1,
            where: {
            },
            order: [['createdAt', 'DESC']]
        }).then(function(treatments) {
            model.Treatment.destroy({
                where: {
                    id: treatments[0].id
                }
            }).then(function(){
                done();
            });
        });
    });
    it('Test of editing a treatment to check that the data has been changed', function (done) {
        // Fetch latest created entry from treatment table
        model.Treatment.findAll({
            limit: 1,
            where: {
            },
            order: [['createdAt', 'DESC']]
        }).then(function(treatments) {
            //Send a request to database for editing a treatment
            supertest(app)
            .put('/treatment/' + treatments[0].id)
            .send({description: 'Treatment edited', TreatmentTypeId: '1'})
            .expect(302)
            .end((err, res) => {
                should.not.exist(err);
                res.headers.location.substring(0,6).should.not.equal('/error/');
                // Get latest created entry in treatment table to fetch the updated data
                model.Treatment.findOne({
                    where: {
                        id: treatments[0].id
                    },
                }).then(updatedTreatment => {
                    updatedTreatment.description.should.not.equal(treatments[0].description);
                    updatedTreatment.TreatmentTypeId.should.not.equal(treatments[0].TreatmentTypeId);
                    done();
                });
            });
        });
    });
});

describe('Test of deleting a treatment', function() {
    var nbrOfTreatmentsBefore;
    var treatmentID;
    beforeEach(function (done) {
        var data = {description: 'Treatment created', TreatmentTypeId: '2'};
        //creating a treatment
        model.Treatment.create(data)
	    .then(response => {
            treatmentID = response.id;
            // Fetch all entries from treatment table
            model.Treatment.findAll()
            .then(function(treatments) {
                nbrOfTreatmentsBefore = treatments.length;
                done();
            });
        });
    });
    it('Test of deleting a treatment to check that it has been removed from the database', function (done) {
        //Send a request to database for deleting the treatment
        supertest(app)
        .delete('/treatment/' + treatmentID)
        .expect(302)
        .end((err, res) => {
            should.not.exist(err);
            res.headers.location.substring(0,6).should.not.equal('/error/');
            // Fetch all entries from treatment table
            model.Treatment.findAll()
            .then(function(treatments) {
                //Check that the created treatment is gone by first comparing the numbers of entries in the treatment table before and after
                treatments.length.should.equal(nbrOfTreatmentsBefore-1);
                //Check that the created treatment is gone by checking if the deleted treatment's id is not in the treatment table
                for(var i=0; i<treatments.length; i++){
                    treatments[i].id.should.not.equal(treatmentID);
                }
                done();
            });
        });
    });
});