const db = require('../app/models/');
const fs = require('fs');

// set the delay in milliseconds
let delay = 2000;

setTimeout(() => {
	fs.readFile(__dirname + '/testdata.sql', function (err, data) {
		if (err) {
				throw err;
		}
		console.log('\nInserting testdata...\n');
		db.sequelize.query(data.toString()).then(() => {
			console.log('\nInserting testdata completed.');
			process.exit(0);
		}).catch(err => {
			console.log('\nError inserting testdata.');
		});

	});
}, delay);
