const model = require('../models');
const app = require('../../server.js');

module.exports.getAllNurses = function (req, res, next) {
    model.Nurse.findAll({
        attributes: ['firstname', 'lastname'],
        limit: 5
    }).then(nurses => {
        nurses.forEach(n => {
            app.print(n.get({ plain: true }));

        });
        //res.render('doctor', {
            //title: 'Nurses',
            //nurses: nurses});
    });
};
