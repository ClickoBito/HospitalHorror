import supertest from 'supertest';
import app from '../../../server';
import each from 'async/each';
import _ from 'lodash';

const should = require('chai').should();

describe('Test of the back-end search functionality', () => {
    describe('Search success cases', () => {
        it('Should find one user for each case that is correct type', (done) => {
            const tests = [
                {search: 'Robert', expectKey: 'patients'},
                {search: 'Jason', expectKey: 'admins'},
                {search: 'Cole', expectKey: 'doctors'},
                {search: 'Brad', expectKey: 'nurses'},
                {search: 'Miley', expectKey: 'secretaries'}
            ];
            each(tests, function(test, callback) {
                supertest(app)
                    .get('/search')
                    .send({ search: test.search })
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.be.an('object');
                        res.body.resultCount.should.equal(1);
                        res.body[test.expectKey].length.should.equal(1);
                        res.body[test.expectKey][0].firstname.should.equal(test.search);
                        callback();
                    });
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should return nothing from invalid search', (done) => {
            supertest(app)
                .get('/search')
                .send({ search : 'Not a valid search query' })
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.be.an('object');
                    res.body.resultCount.should.equal(0);
                    done();
                });
        });
    });
    describe('Search failure cases', () => {
        it('Should return 400 bad request when no body', (done) => {
            supertest(app)
                .get('/search')
                .expect(400)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.should.be.an('object');
                    res.body.should.have.all.keys('error');
                    done();
                });
        });
        it('Should return 400 bad request when bad body', (done) => {
            const bodies = [
                null,
                {},
                {not_search: 'yo!'},
                {search: null},
                {search: 1},
                {search: {nested: 'wat'}}
            ];
            each(bodies, function(body, callback) {
                supertest(app)
                    .get('/search')
                    .send(body)
                    .expect(400)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.be.an('object');
                        res.body.should.have.all.keys('error');
                        callback();
                    });
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
    });
});
