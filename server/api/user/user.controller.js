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

module.exports = users;