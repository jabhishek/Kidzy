var app = require('../../app');
var request = require('supertest');
var auth = require('../auth/auth.service');
var data = require("../../data");
var testUsers = require('../../../tests/e2e/config/users');
var should = require("chai").should();

describe('GET /api/kids', function() {
    var kidsApiPath = '/api/kids';
    beforeEach(function(done) {
        // Clear users before testing
        data.kids.remove({}, function (err) {

        });

        data.users.getByEmail(testUsers.parent.email, function(err, user) {
            console.log('user:');
            console.log(user);
            data.kids.add({
                parentId: user._id,
                childName: 'test child 2'
            }, function(err, response) {
                done();
            });
        })
    });

    it('should respond with 401 if no user passed', function(done) {
        request(app)
            .get(kidsApiPath)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should respond with 200 if a parent user passed', function(done) {
        var token = auth.signToken(testUsers.parent.id);
        request(app)
            .get(kidsApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return kids for logged in user', function(done) {
        var token = auth.signToken(testUsers.parent.id);
        request(app)
            .get(kidsApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.include.keys('kids');
                done();
            });
    });

    it('should return kids of type array for logged in user', function(done) {
        var token = auth.signToken(testUsers.parent.id);
        request(app)
            .get(kidsApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.kids.should.be.instanceof(Array);
                done();
            });
    });

    it.only('should return correct number of kids for logged in user - 1', function(done) {
        var token = auth.signToken(testUsers.parent.id);
        request(app)
            .get(kidsApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.kids.length.should.equal(1);
                done();
            });
    });

    it.only('should return correct number of kids for logged in user - 2', function(done) {
        var token = auth.signToken(testUsers.admin.id);
        request(app)
            .get(kidsApiPath)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.kids.length.should.equal(0);
                done();
            });
    });
});
