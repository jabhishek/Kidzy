var users = {};
var data = require("../../data");
var hasher = require("../../api/auth/hasher");
var auth = require("../../api/auth/auth.service");

function User(user) {
	"use strict";
	var salt = hasher.createSalt(8);
	this.email = user.email;
	this.name = user.name;
	this.hashedPassword = hasher.computeHash(user.password, salt);
	this.provider = 'local';
	this.role = 'parent';
	this.salt = salt;
	this.username = user.username;
}

// Get list of users
users.index = function (req, res) {
	data.users.getAll(function processResults(err, results) {
		res.json({
			err: err,
			users: results
		});
	});
};

users.getLoggedInUser = function (req, res) {
	if (!req.user || !req.user._id) {
		res.json({
			err: "Invalid request."
		});
	} else {
		data.users.getById(req.user._id, function processResults(err, result) {
			res.set('Cache-Control', 'no-cache');
			res.json({
				err: err,
				user: result
			});
		});
	}
};

users.createUser = function (req, res) {
	var newUser = req.body;
	if (newUser && newUser.email && newUser.password && newUser.name && newUser.username) {
		data.users.getByUserName(newUser.username, function (err, user) {
			"use strict";
			if (user) {
				// User already present
				res.status(400).json('User already registered!!');
			} else {
				// Add user
				data.users.add(new User(newUser), function (err, userCreated) {
					if (err) {

					}
					else {
						res.status(200).json({});
					}
				});
			}
		});
	} else {
		res.status(400).json('Invalid user passed!!');
	}
};

users.checkUser = function (req, res) {
	if (!req.params.username) {
		res.json({
			available: false
		});
	} else {
		data.users.getByUserName(req.params.username, function processResults(err, result) {
			var available = true;
			if (result) {
				available = false;
			}
			res.json({
				available: available
			});
		});
	}
};

module.exports = users;