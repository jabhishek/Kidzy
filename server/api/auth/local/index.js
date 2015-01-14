var express = require("express");
var router = express.Router();
var data = require("../../../data");
var hasher = require("../hasher");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var auth = require("../auth.service");

function authenticateUser(username, password, next) {
    "use strict";
    data.users.getByUserName(username, function (err, user) {
        if (!err && user) {
            var hash = hasher.computeHash(password, user.salt);
            if (hash === user.hashedPassword) {
                next(null, user);
                return;
            } else {
            }
        }
        next(null, false, {message: "Invalid credentials!!"});
    });
}

passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    authenticateUser
));

// auth/local
router.post('/', function (req, res, next) {
    if (req.body.username && req.body.password) {
        passport.authenticate('local', function (err, user, info) {
            var error = err || info;
            if (error) return res.json(401, error);
            if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

            var token = auth.signToken(user._id, user.role);
            res.status(200).json({token: token});
        })(req, res, next)
    } else {
        return res.status(401).json({});
    }
});

module.exports = router;


