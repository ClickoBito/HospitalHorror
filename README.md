# EDA397/DIT191 Agile Development Processes Project

[![Build Status](https://travis-ci.org/HeyHoProBro/HospitalHorror.svg?branch=development)](https://travis-ci.org/HeyHoProBro/HospitalHorror)

Contains the [report](report.md), the [source code for the app](Server) and the [meta level requirements for the project](project.md). The report can be built by running `make` ([Pandoc](https://pandoc.org/) is required).


### How to get the app started:
- Install [Node.js](https://nodejs.org)
- Install [MariaDB](https://downloads.mariadb.org/) (MySQL *might* work as well) and create a database on your localhost. Alternatively create a database on another host.
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
- Create the database by running in the *Server/*-directory: `npm run resync`.
- *Optional, but recommended:* Insert testdata into the database by running in the *Server/*-directory: `npm run load_testdata`.
- Start the app by running in the *Server/*-directory: `npm start`. Alternatively run `nodemon -e html,css,js,pug` (if it's installed) or possibly *forever*: `forever start server.js`
- Visit `http://localhost:8890`
