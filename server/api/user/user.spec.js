var app = require('../../app');
var auth = require('../auth/auth.service');
var request = require('supertest');
var testUsers = require('../../../tests/e2e/config/users');
var data = require("../../data");

var parentId, adminId, childId;
before(function() {
    "use strict";
    data.users.getByEmail(testUsers.parent.email, function(err, user) {
        parentId = user._id;
        done();
    })
});
before(function() {
    "use strict";
    data.users.getByEmail(testUsers.admin.email, function(err, user) {
        adminId = user._id;
        done();
    })
});
before(function() {
    "use strict";
    data.users.getByEmail(testUsers.child.email, function(err, user) {
        childId = user._id;
        done();
    })
});

describe('GET /api/users', function() {
    var usersApiPath = '/api/users';
    it('should respond with 401 if no user passed', function(done) {
        request(app)
            .get(usersApiPath)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 401 if a parent user passed', function(done) {
        var token = auth.signToken(parentId);
        request(app)
            .get(usersApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 401 if a child user passed', function(done) {
        var token = auth.signToken(childId);
        request(app)
            .get(usersApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 200 if an admin user passed', function(done) {
        var token = auth.signToken(adminId);
        request(app)
            .get(usersApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /api/users/me', function() {
    var apiPath = '/api/users/me';
    it('should respond with 401 if no user passed', function(done) {
        request(app)
            .get(apiPath)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 401 if a parent user passed', function(done) {
        var token = auth.signToken(parentId);
        request(app)
            .get(apiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                console.log(err);
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 401 if a child user passed', function(done) {
        var token = auth.signToken(childId);
        request(app)
            .get(apiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 200 if an admin user passed', function(done) {
        var token = auth.signToken(adminId);
        request(app)
            .get(apiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
