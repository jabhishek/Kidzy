var app = require('../../app');
var request = require('supertest');
var testUsers = require('../../../tests/e2e/config/users');
var auth = require('./auth.service');

describe('GET /auth/local', function () {
	it('should respond with 401 if no user passed', function (done) {
		request(app)
			.post('/auth/local')
			.expect(401)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('should respond with 200 if a parent user passed', function (done) {
		request(app)
			.post('/auth/local')
			.send(testUsers.parent)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('should respond with 200 if a child user passed', function (done) {
		request(app)
			.post('/auth/local')
			.send(testUsers.child)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});
});
