/*jslint node: true */
'use strict';

const app = require('../../server.js');

let users = [];

function addUser(id) {
	if (users.includes(id))
		return;
	users.push(id);
}
module.exports.addUser = addUser;

function deleteUser(id) {
	for (let i = 0; i < users.length; i++) {
		if (users[i] === id) {
			users.splice(i,1);
			return;
		}
	}
}
module.exports.deleteUser = deleteUser;

module.exports.getOnlineUsers = users;
