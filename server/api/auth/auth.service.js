
var config = require('../../config/environment');
var data = require('../../data');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });

(function (auth) {

    auth.isAuthenticated = function () {
        return compose()
            // Validate jwt
            .use(function (req, res, next) {
                // allow access_token to be passed through query parameter as well
                console.log(req.query);
                if (req.query && req.query.hasOwnProperty('access_token')) {
                    req.headers.authorization = 'Bearer ' + req.query.access_token;
                }
                validateJwt(req, res, next);
            })
            // Attach user to request
            .use(function (req, res, next) {
                data.users.getById(req.user._id, function (err, user) {
                    if (err) return next(err);
                    if (!user) return res.send(401);

                    req.user = user;
                    next();
                });
            });
    };


    auth.signToken = function(id) {
        return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
    }
})(module.exports);



