import supertest from 'supertest';
import app from '../../../../server';

const should = require('chai').should();

describe('This is an example test to see if stuff works', () => {
    it('This is the first test getting the homepage', (done) => {
        supertest(app)
        .get('/test')
        .expect(200)
        .end((err, res) => {
            should.not.exist(err);
            done();
        });
    })
});