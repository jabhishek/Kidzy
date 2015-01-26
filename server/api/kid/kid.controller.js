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

kids.addKid = function(req, res) {
	console.log(req.user);
	"use strict";
	if (!req.user || !req.user._id || !req.body) {
		res.status(400).json({
			err: "Invalid request."
		});
	} else {
		var child = req.body;
		child.parentId = req.user._id;

		data.kids.add(child, function(err, result) {
			res.status(200).json({
				err: null
			});
		})
	}
};

module.exports = kids;