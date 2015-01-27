(function (kids) {
    "use strict";
    var database = require("./database");
    var ObjectID = require('mongodb').ObjectID;

    kids.getAllByParentId = function (id, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                id = id.toString();
                theDb.kids.find({'parentId': new ObjectID(id)}).toArray(function sendResultsToCaller(err, results) {
                    if (err) {
                        next(err);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    kids.add = function (kid, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.kids.insert(kid, next);
            }
        });
    };

    kids.addHousePoint = function (childId, housePointObject, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.kids.update({ '_id':  new ObjectID(childId)},
					{
						$push: {
							housePoints: housePointObject
						}
					},
					next);
            }
        });
    };

    kids.remove = function (kid, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.kids.remove(kid, next);
            }
        });
    };

})(module.exports);