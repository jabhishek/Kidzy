var users = {};
var data = require("../../data");

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
    console.log("getLoggedInUser called");
    data.users.getById(req.user._id, function processResults(err, result) {
        console.log("user retrieved");
        res.json({
            err: err,
            user: result
        });
    });
};

users.checkUser = function (req, res) {
    console.log("checkUser called");
    console.log(req.params);
    console.log(typeof true);
    if (!req.params.email) {
        res.json({
            available: false
        });
    } else {
        data.users.getByEmail(req.params.email, function processResults(err, result) {
            console.log("user retrieved");
            console.log(err);
            console.log(result);
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