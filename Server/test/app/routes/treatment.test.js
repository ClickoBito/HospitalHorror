import _ from 'lodash';
import supertest from 'supertest';
import app from '../../../server';

const should = require('chai').should();
const model = require('../../../app/models/');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// This sleep function is needed for the tests below to work
function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i<1e7; i++) {
        if(((new Date().getTime() - start) > ms)) {
            break;
        }
    }
}

// Example test creating treatment
describe('Test of creating a treatment', () => {
    it('Test of creating a treatment by checking if it is created', done => {
        // Create a treatment in treatment table
        supertest(app)
        .post('/treatment')
        .send({description: 'Treatment created', TreatmentTypeId: '2'})
        .expect(302)
        .end((err, res) => {
            should.not.exist(err);
            res.headers.location.substring(0,6).should.not.equal('/error/');
            // Get latest created entry in treatment table
            model.Treatment.findAll({
                limit: 1,
                where: {
                },
                order: [['createdAt', 'DESC']]
            }).then(function(treatments) {
                treatments[0].description.should.equal('Treatment created');
                treatments[0].TreatmentTypeId.should.equal(2);
                // Delete latest created entry in treatment table
                model.Treatment.destroy({
                    where: {
                        id: treatments[0].id
                    }
                });
                done();
            });
        });
    });
    it('Test of creating 5 treatment by checking if their ids\' are correct', done => {
        var count = 0;
        for(var i=0; i<5; i++){
            sleep(200);
            // Create 5 treatments in treatment table
            supertest(app)
            .post('/treatment')
            .expect(302)
            .end((err, res) => {
                should.not.exist(err);
                res.headers.location.substring(0,6).should.not.equal('/error/');
                    if(count => 5) {
                        // Get the 5 latest created entries in treatment table
                        model.Treatment.findAll({
                            limit: 5,
                            where: {
                            },
                            order: [['createdAt', 'DESC'], ['id', 'DESC']]
                        }).then(function(treatments) {
                            for(var j=0; j<4; j++){
                                // Check if all ids' are different and if every id is increasing by 1 after creating a treatment
                                (treatments[j].id-treatments[j+1].id).should.equal(1);
                            }
                            //Delete all new treatments added
                            model.Treatment.destroy({
                                where: {
                                    [Op.or]: [{id: treatments[0].id},{id: treatments[1].id}, 
                                    {id: treatments[2].id}, {id: treatments[3].id}, {id: treatments[4].id}]
                                }
                            });
                            done();
                        });
                    }
                count++;
            });
        }
    });
});

