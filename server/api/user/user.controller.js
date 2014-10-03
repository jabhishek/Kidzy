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

module.exports = users;