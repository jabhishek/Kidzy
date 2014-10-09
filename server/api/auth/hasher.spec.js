
var should = require("chai").should();

var hasher = require('./hasher');

describe('hasher', function () {
    it('createSalt should return a salt', function (done) {
        var salt = hasher.createSalt();
        should.exist(salt);
        done();
    });


    it('createSalt create random bytes as long as the passed integer', function (done) {
        var salt = hasher.createSalt(8);
        (salt.length).should.equal(8);

        salt = hasher.createSalt(10);
        (salt.length).should.equal(10);
        done();
    });

    it('createSalt create random bytes of 8 characters long if no paramaters passed', function (done) {
        var salt = hasher.createSalt();
        (salt.length).should.equal(8);

        done();
    });

    it('computeHash create a hash', function (done) {
        var salt = hasher.createSalt(8);
        var hash = hasher.computeHash("abc", salt);
        should.exist(hash);

        done();
    });

    it('computeHash create the same hash for the same string and salt', function (done) {
        var salt = hasher.createSalt(8);
        var hash1 = hasher.computeHash("abc", salt);
        var hash2 = hasher.computeHash("abc", salt);
        hash1.should.equal(hash2);

        done();
    });

    it('computeHash create different hash for the same string but different salt', function (done) {
        var salt1 = hasher.createSalt(8);
        var salt2 = hasher.createSalt(10);
        var hash1 = hasher.computeHash("abc", salt1);
        var hash2 = hasher.computeHash("abc", salt2);
        hash1.should.not.equal(hash2);

        done();
    });

    it('computeHash create different hash for the different string and same salt', function (done) {
        var salt = hasher.createSalt(8);
        var hash1 = hasher.computeHash("xyz", salt);
        var hash2 = hasher.computeHash("abc", salt);
        hash1.should.not.equal(hash2);

        done();
    });

    it('computeHash create different hash for different string and salt', function (done) {
        var salt1 = hasher.createSalt(8);
        var salt2 = hasher.createSalt(10);
        var hash1 = hasher.computeHash("xyz", salt1);
        var hash2 = hasher.computeHash("abc", salt2);
        hash1.should.not.equal(hash2);

        done();
    });
});
