var kids = {};
var data = require("../../data");

// Get all kids for a user
kids.index = function (req, res) {
	if (!req.user || !req.user._id) {
		res.status(400).json({
			err: "Invalid request."
		});
	} else {
		data.kids.getAllByParentId(req.user._id, function processResults(err, results) {
			res.status(200).json({
				err: err,
				kids: results
			});
		});
	}
};

module.exports = kids;