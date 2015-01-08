var app = require('../../app');
var auth = require('../auth/auth.service');
var request = require('supertest');
var testUsers = require('../../../tests/e2e/config/users');
var data = require("../../data");

var parentId, adminId, childId;
before(function(done) {
    "use strict";
    data.users.getByEmail(testUsers.parent.email, function(err, user) {
        parentId = user._id;
        done();
    })
});
before(function(done) {
    "use strict";
    data.users.getByEmail(testUsers.admin.email, function(err, user) {
        adminId = user._id;
        done();
    })
});
before(function(done) {
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

describe('GET /api/users/checkUser', function() {
    var checkUserApiPath = '/api/users/checkUser';
    it('should respond with 200', function(done) {
        request(app)
            .get(checkUserApiPath + '/test@test.com')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should have a response with property exists', function(done) {
        request(app)
            .get(checkUserApiPath + '/test@test.com')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.include.keys('available');
                done();
            });
    });
    it('should have a response with property available of type boolean', function(done) {
        request(app)
            .get(checkUserApiPath + '/test@test.com')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.available.should.be.a('boolean');
                done();
            });
    });
    it('should have true as the value of available, if email does not exist', function(done) {
        request(app)
            .get(checkUserApiPath + '/correct@test.com')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.available.should.equal(true);
                done();
            });
    });

    it('should have false as the value of available, if email exists', function(done) {
        request(app)
            .get(checkUserApiPath + '/test@test.com')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.available.should.equal(false);
                done();
            });
    });
});

describe('POST /api/users', function() {
    var createUserApiPath = '/api/users';
    it('should respond with 400 if no user passed', function(done) {
        request(app)
            .post(createUserApiPath)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 400 if no email passed in user', function(done) {
        request(app)
            .post(createUserApiPath)
            .send({password: 'a'})
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 400 if no password passed in user', function(done) {
        request(app)
            .post(createUserApiPath)
            .send({email: 'a@a.com'})
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 400 if no name passed in user', function(done) {
        request(app)
            .post(createUserApiPath)
            .send({email: 'a@a.com', password: 'aaa'})
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 400 if email already registered', function(done) {
        request(app)
            .post(createUserApiPath)
            .send({email: 'test@test.com', password: 'test'})
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    before(function(done) {
        "use strict";
        data.users.remove({ email: 'a@a.com'}, function() {
            done();
        })
    });
    it('should respond with 200 if valid user passed', function(done) {
        request(app)
            .post(createUserApiPath)
            .send({email: 'a@a.com', password: 'test', name: 'temp'})
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});