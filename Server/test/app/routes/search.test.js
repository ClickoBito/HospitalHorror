import supertest from 'supertest';
import app from '../../../server';
import each from 'async/each';
import _ from 'lodash';

const should = require('chai').should();

const search = (fields, assert, expect = 200) => {
    supertest(app)
        .get('/search' + fields)
        .send({ json: true })
        .expect(expect)
        .end((err, res) => {
            should.not.exist(err);
            assert(res);
        });
};

describe('Test of the back-end search functionality', () => {
    describe('Search success cases', () => {
        it('Should find one user for each case that is correct type', (done) => {
            const tests = [
                { search: 'Robert', resultType: 'patients', matchedOn: 'firstname' },
                { search: 'Gustavsson', resultType: 'patients', matchedOn: 'lastname' },
                { search: 'Jason', resultType: 'admins', matchedOn: 'firstname' },
                { search: 'Walker', resultType: 'admins', matchedOn: 'lastname' },
                { search: 'Cole', resultType: 'doctors', matchedOn: 'firstname' },
                { search: 'Berg', resultType: 'doctors', matchedOn: 'lastname' },
                { search: 'Melanie', resultType: 'nurses', matchedOn: 'firstname' },
                { search: 'Hunter', resultType: 'nurses', matchedOn: 'lastname' },
                { search: 'Miley', resultType: 'secretaries', matchedOn: 'firstname' },
                { search: 'Haley', resultType: 'secretaries', matchedOn: 'lastname' }
            ];
            each(tests, function(test, callback) {
                search('?search=' + test.search, (res) => {
                    res.body.should.be.an('object');
                    res.body.resultCount.should.equal(1);
                    res.body[test.resultType].length.should.equal(1);
                    res.body[test.resultType][0][test.matchedOn].should.equal(test.search);
                    callback();
                });
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should find correct number of users for partial matches', (done) => {
            const tests = [
                { search: 'Edd', expectedResults: 1 },
                { search: 'edd', expectedResults: 1 },
                { search: 'Ja', expectedResults: 2 },
                { search: 'c', expectedResults: 2 }
            ];
            each(tests, function(test, callback) {
                search('?search=' + test.search, (res) => {
                    res.body.should.be.an('object');
                    res.body.resultCount.should.equal(test.expectedResults);
                    callback();
                });
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should return diagnosis from search', (done) => {
            const tests = [
                { search: 'this is not valid', expectedResults: 0 },
                { search: 'speech therapist', expectedResults: 1 },
                { search: 'should be', expectedResults: 4 },
                { search: 'endocarditis', expectedResults: 1 },
                { search: 'antibiotic', expectedResults: 2 },
                { search: 'tablet', expectedResults: 3 }
            ];
            each(tests, function(test, callback) {
                search('?diagnosis=true&search=' + test.search, (res) => {
                    res.body.should.be.an('object');
                    res.body.resultCount.should.equal(test.expectedResults);
                    callback();
                });
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should return nothing from invalid search', (done) => {
            search('?search=sdfasdfasdfasdfasdf', (res) => {
                res.body.should.be.an('object');
                res.body.resultCount.should.equal(0);
                done();
            });
        });
    });

    describe('Search failure cases', () => {
        it('Should return 400 bad request when bad body', (done) => {
            const tests = [
                { search: '/' },
                { search: '' },
                { search: '?not_search' },
                { search: '?not_search=Edd' },
                { search: '?search' },
                { search: '?search=' },
            ];
            each(tests, function(test, callback) {
                search(test.search, (res) => {
                    res.body.should.be.an('object');
                    res.body.should.have.all.keys('error');
                    callback();
                }, 400);
            }, function(err) {
                should.not.exist(err);
                done();
            });
        });
    });
});
