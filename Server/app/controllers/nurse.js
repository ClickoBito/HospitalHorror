const model = require('../models');

module.exports.getAllNurses = function (req, res, next) {
    model.Nurse.findAll({
        attributes: ['firstname', 'lastname'],
        limit: 5
    }).then(nurses => {
        nurses.forEach(n => {
            console.log(n.get({ plain: true }));
            
        });
        //res.render('doctor', {
            //title: 'Nurses', 
            //nurses: nurses});
    });
};
