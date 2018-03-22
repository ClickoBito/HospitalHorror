// server.js

// modules =================================================
const express = require('express');
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// configuration ===========================================

// config files
//const db = require('./config/db');

// set our port
const port = process.env.PORT || 8890;

// favivon
//app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

// handling authentication
app.use(session({
	secret: 'supersecretsecret',
	name: 'hhcookie',
	store: new SessionFileStore(),
	//proxy: true,
	resave: false,
	saveUninitialized: true
}));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
const index = require('./app/routes/index');
app.use('/', index);

// start app ===============================================
// startup our app at http://localhost:4242
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
