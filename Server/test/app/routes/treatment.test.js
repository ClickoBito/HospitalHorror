import _ from 'lodash';
import supertest from 'supertest';
import app from '../../../server';

const should = require('chai').should();

// Example test creating treatment
describe('Test of creating a treatment', () => {
    it('This is the first test of creating the treatment', (done) => {
        supertest(app)
        .post('/treatment')
        .send({description: 'Treatment created', TreatmentTypeId: '2'})
        .set('Accept', 'application/json')
        .expect(302)
        .end((err, res) => {
            should.not.exist(err);
            console.log('Här' + res.headers);
            done();
        });
    });
});

