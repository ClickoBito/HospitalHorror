const db = require('../app/models/');

// set the delay in milliseconds
let delay = 2000;

setTimeout(() => {
	db.sequelize.sync({force:true})
	.then(() => {
		console.log('\nRecreating tables completed.');
		process.exit(0);
	}).catch(err => {
		console.log('\nError syncing database.');
	});
}, delay);
