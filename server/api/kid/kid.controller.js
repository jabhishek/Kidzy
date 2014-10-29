var kids = {};
var data = require("../../data");

// Get all kids for a user
kids.index = function (req, res) {
    console.log("calling kids.getAll");
    data.kids.getAllByParentId(req.user._id, function processResults(err, results) {
        console.log("getAll complete");
        console.log(results);
        res.json({
            err: err,
            kids: results
        });
    });
};

module.exports = kids;