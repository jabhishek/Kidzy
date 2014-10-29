(function (kids) {
    "use strict";
    var database = require("./database");
    var ObjectID = require('mongodb').ObjectID;

    kids.getAllByParentId = function (id, next) {
        console.log("called getall");
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                console.log("db retrieved");
                id = id.toString();
                theDb.kids.find({'parentId': new ObjectID(id)}).toArray(function sendResultsToCaller(err, results) {
                    if (err) {
                        console.log("error sending results");
                        next(err);
                    } else {
                        console.log("sending results");
                        console.log(results);
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