import _ from 'lodash';
import supertest from 'supertest';
import app from '../../../server';

const should = require('chai').should();

// Example test fetching /test endpoint
describe('This is an example test fetching the default page', () => {
    it('This is the first test getting the homepage', (done) => {
        supertest(app)
        .get('/test')
        .expect(200)
        .end((err, res) => {
            should.not.exist(err);
            done();
        });
    });
});

// example test demonstrating how logic can be tested
describe('lodash test example to demonstrate functionality', () => {
    it('Should clone and preserve origin', (done) => {
        let origin = ['a', 'b', 'c'];
        let result = _.clone(origin);
        result[0] = 'd';
        origin.should.deep.equal(['a', 'b', 'c']);
        result.should.deep.equal(['d', 'b', 'c']);
        done();
    });

    it('Should create union set from arrays', (done) => {
        let result = _.union([1, 2], [2, 3], [2, 3, 4]);
        result.should.deep.equal([1, 2, 3, 4]);
        done();
    });
});
