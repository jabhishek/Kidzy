var kidsController = require('./kid.controller');
var chai = require("chai");
var should = chai.should();
var expect = chai.expect
var data = require("../../data");
var sinon = require("sinon");

describe("kid controller", function () {
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
					sentData = resp.kids;
				},
				status: function (status) {
					statusCode = status;
					return this;
				}
			};
		});
		it("should return error if no user in request", function () {
			req = {};

			kidsController.index(req, res);
			expect(err).to.equal("Invalid request.");
			expect(statusCode).to.equal(400);
		})
		it("should return error if user passed has no id", function () {
			req = {user: {}};

			kidsController.index(req, res);
			expect(err).to.equal("Invalid request.");
			expect(statusCode).to.equal(400);
		});
		it("should return data if correct user passed", function () {
			req = {user: {_id: 1}};

			data.kids = {
				getAllByParentId: function (parentId, callback) {
					callback(null, [])
				}
			};

			kidsController.index(req, res);
			expect(err).to.equal(null);
			expect(statusCode).to.equal(200);
			expect(sentData).to.deep.equal([]);
		});

	})

	describe("addKid", function () {
		beforeEach(function () {
			res = {
				json: function (resp) {
					err = resp.err;
					sentData = resp.kids;
				},
				status: function (status) {
					statusCode = status;
					return this;
				}
			};
		});

		it("should return error if no user in request", function () {
			req = {};
			kidsController.addKid(req, res);
			expect(err).to.equal("Invalid request.");
			expect(statusCode).to.equal(400);
		})
		it("should return error if user passed has no id", function () {
			req = {user: {}};

			kidsController.addKid(req, res);
			expect(err).to.equal("Invalid request.");
			expect(statusCode).to.equal(400);
		});
		it("should return error if user passed has no body", function () {
			req = {user: {_id: 1}};

			kidsController.addKid(req, res);
			expect(err).to.equal("Invalid request.");
			expect(statusCode).to.equal(400);
		});
		it("should call kids.add if correct data passed", function () {
			req = {user: {_id: 1}, body: {name: 'kiddo'}};

			data.kids = {
				add: function (kid, callback) {
					console.log("added");
					callback(null, [])
				}
			};

			sinon.spy(data.kids, "add");
			kidsController.addKid(req, res);
			expect(data.kids.add.calledOnce).to.equal(true);
		});
	})
})

