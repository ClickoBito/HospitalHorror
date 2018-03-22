const express = require('express');
const router = express.Router();


// controller
//const MyCtrl = require('../controllers/ctrl.js');


// RESTful API
//router.get('/home', MyCtrl.getHome);


// frontend routes =========================================================
// route to handle all angular requests
router.get('*', function(req, res) {
	res.sendFile('./public/views/index.html', { root: __dirname + "./../.." });
});


module.exports = router;
