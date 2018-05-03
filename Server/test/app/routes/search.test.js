import supertest from 'supertest';
import app from '../../../server';
import each from 'async/each';

const should = require('chai').should();import _ from 'lodash';

describe('Test of the back-end search functionality', () => {
    it('Should find one user for each case that is correct type', (done) => {
        const tests = [
            {username: 'admin', userType: 'Admin'},
            {username: 'doctor', userType: 'Doctor'},
            {username: 'nurse', userType: 'Nurse'},
            {username: 'secretary', userType: 'Secretary'}
        ];
        each(tests, function(test, callback) {
            supertest(app)
                .post('/search')
                .send({ username : test.username })
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.be.an('object');
                    res.body.searchResults.should.equal(1);
                    res.body.dataValues.userType.should.equal(test.userType);
                    callback();
                });
        }, function(err) {
            should.not.exist(err);
            done();
        });
    });
    it('Should gracefully return nothing from invalid search', (done) => {
        supertest(app)
            .post('/search')
            .send({ username : 'Not a valid name' })
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.should.equal({searchResults: 0});
                callback();
            });
    });
});
