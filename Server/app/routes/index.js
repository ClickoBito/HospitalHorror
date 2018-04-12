const express = require('express');
const router = express.Router();

const server = express();

// controller
const AuthCtrl = require('../controllers/auth.js');


// RESTful API
router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);


// TODO: put function in a controller
const getHomeIDController = (req, res) => {
	res.sendFile('./views/home.html', { root: __dirname + "./../.." });
}

router.get('/home/:id', getHomeIDController);

// TODO: put function in a controller
const getAdminController = (req, res) => {
	console.log('Admin logged in');
	res.sendFile('./views/admin.html', { root: __dirname + "./../.." });
}

router.get('/admin', getAdminController);

// frontend routes =========================================================

// TODO: put function in a controller
const indexController = (req, res) => {
	console.log('res.sendFile... index.html');
	res.sendFile('./views/index.html', { root: __dirname + "./../.." });
	// res.status(200).send({hey: 'hey'});
}

// route to handle all other requests
router.get('*', indexController);


module.exports = router;
