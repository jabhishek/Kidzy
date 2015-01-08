var kids = {};
var data = require("../../data");

// Get all kids for a user
kids.index = function (req, res) {
    data.kids.getAllByParentId(req.user._id, function processResults(err, results) {
        res.json({
            err: err,
            kids: results
        });
    });
};

module.exports = kids;