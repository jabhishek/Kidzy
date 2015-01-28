var userController = require('./user.controller');
var chai = require("chai");
var should = chai.should();
var expect = chai.expect
var data = require("../../data");

describe("user controller", function () {
	"use strict";
	var req,
		res,
		err,
		statusCode,
		sentData;

	describe('index', function () {

		beforeEach(function () {
			res = {
				json: function (resp) {
					err = resp.err;
					sentData = resp.users;
				}
			};
		});
		it("should return data", function () {
			data.users = {
				getAll: function (callback) {
					callback(null, [])
				}
			};

			userController.index(req, res);
			expect(err).to.not.exist;
			expect(sentData).to.deep.equal([]);
		})

		it("should return error in response if there is an error while retrieving data", function () {
			data.users = {
				getAll: function (callback) {
					callback("Error");
				}
			};

			userController.index(req, res);
			expect(err).to.exist;
			expect(sentData).to.not.exist;
		})
	})
	describe('getLoggedInUser', function () {
		beforeEach(function () {
			res = {
				json: function (resp) {
					err = resp.err;
					sentData = resp.user;
				},
				set: function () {

				}
			};
		});
		it("should return error if no user passed in request", function () {
			req = {};
			userController.getLoggedInUser(req, res);
			expect(err).to.equal("Invalid request.");
		})
		it("should return error if _id not found in request", function () {
			req = {user: {}};
			userController.getLoggedInUser(req, res);
			expect(err).to.equal("Invalid request.");
		})
		it("should not return error if correct data passed", function () {
			req = {user: {_id: 1}};
			data.users = {
				getById: function (id, callback) {
					callback(null, {_id: id, name: "user"})
				}
			};

			userController.getLoggedInUser(req, res);
			expect(err).to.equal(null);
			expect(sentData).to.deep.equal({_id: 1, name: "user"});
		})
	})

	describe("createUser", function () {
		var testUser;
		beforeEach(function () {
			testUser = {name: "user", email: 'a@a.com', username: 'username', password: 'password'};

			res = {
				json: function (resp) {
					sentData = resp;
				},
				status: function (status) {
					statusCode = status;
					return this;
				}
			};

			data.users = {
				getByUserName: function (username, callback) {
					callback(null, null);
				},
				add: function (user, callback) {
					callback();
				}
			};
		});

		var expectStatus = function (user, status, message) {
			req = {body: user};
			userController.createUser(req, res);
			expect(statusCode).to.equal(status);
			if (message)
				expect(sentData).to.equal(message);
		}

		it("should return error if no user passed", function () {
			expectStatus({}, 400);
		})
		it("should return error if name not passed in user", function () {
			delete testUser.name;
			expectStatus(testUser, 400, 'Invalid user passed!!');
		})
		it("should return error if username not passed in user", function () {
			delete testUser.username;
			expectStatus(testUser, 400, 'Invalid user passed!!');
		})
		it("should return error if email not passed in user", function () {
			delete testUser.email;
			expectStatus(testUser, 400, 'Invalid user passed!!');
		})
		it("should return error if password not passed in user", function () {
			delete testUser.password;
			expectStatus(testUser, 400, 'Invalid user passed!!');
		})
		it("should return 400 if user already exists", function () {
			// overwrite mock getByUserName to return user, ie user already exists
			data.users.getByUserName = function (username, callback) {
				callback(null, testUser);
			};
			expectStatus(testUser, 400, 'User already registered!!');
		})
		it("should return 200 if correct user passed", function () {
			req = {body: testUser};
			userController.createUser(req, res);
			expect(statusCode).to.equal(200);
			expect(sentData).to.deep.equal({});
		})
	})

	describe("checkUser", function () {
		var testUser;

		var expectStatus = function (username, status, response) {
			req = {params: username};
			userController.checkUser(req, res);
			expect(statusCode).to.equal(status);
			if (response)
				expect(sentData).to.equal(response);
		}

		beforeEach(function () {
			testUser = {name: "user", email: 'a@a.com', username: 'username', password: 'password'};

			res = {
				json: function (resp) {
					sentData = resp;
				},
				status: function (status) {
					statusCode = status;
					return this;
				}
			};
		});

		it("should return available as false if no username passed", function () {
			req = { params: {} };
			userController.checkUser(req, res);
			expect(sentData.available).to.equal(false);
		})

		it("should return available as true if username doesn't exist", function () {
			// username doesn't exist
			data.users = {
				getByUserName: function (username, callback) {
					callback(null, null);
				}
			};

			req = { params: { username: 'abhi'} };
			userController.checkUser(req, res);
			expect(sentData.available).to.equal(true);
		})

		it("should return available as false if username exists", function () {
			// username doesn't exist
			data.users = {
				getByUserName: function (username, callback) {
					callback(null, testUser);
				}
			};

			req = { params: { username: 'abhi'} };
			userController.checkUser(req, res);
			expect(sentData.available).to.equal(false);
		})
	})
});
