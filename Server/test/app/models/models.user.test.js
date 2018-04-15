const model = require('../../../app/models/');
const should = require('chai').should();

// Example test getting data from database
describe('This is an example test checking that the database works', () => {
    it('Should find one user that is Admin', (done) => {
        model.User.findOne({
            where: { userType: 'Admin' }
        }).then((user) => {
            user.should.be.an('object');
            user.dataValues.userType.should.equal('Admin');
            done();
        }, err => {
            should.not.exist(err);
        });
    });
    it('Should find array with users', (done) => {
        model.User.findAll().then(users => {
            users.should.be.an('array');
            users[0].dataValues.userType.should.equal('Admin');
            done();
        }, err => {
            should.not.exist(err);
        });
    });
});
