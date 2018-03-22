# Hospital Horror

How to get it started:
- Install [Node.js](https://nodejs.org)
- Install [MariaDB](https://downloads.mariadb.org/) (MySQL *might* work as well)
- Install *Express* globally: `npm i -g express`
- To install all dependencies go to *Server/* and run: `npm i`
- Create the file *Server/config/local.js* and enter the following:

```
/*jslint node: true */
'use strict';

// TODO: adjust
const db = {
	host: 'YOUR_DATABASE_HOST',
	databasename: 'YOUR_DATABASE_NAME',
	user: 'YOUR_DATABASE_USER',
	password: 'YOUR_DATABASE_PASSWORD'
};


module.exports = db;
```

- Start the app by running in the *Server/*-directory: `node ./server.js` or `nodemon` (if it's installed) or possibly even with *forever* `forever start server.js`
- Visit `http://localhost:8890`
