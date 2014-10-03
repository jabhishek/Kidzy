/**
 * Created by ajain on 04/09/2014.
 */
(function (users) {
    "use strict";
    var database = require("./database");

    users.getAll = function (next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.find().toArray(function sendResultsToCaller(err, results) {
                    if (err) {
                        next(err);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    users.add = function (user, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.insert(user, next);
            }
        });
    };

    users.remove = function (user, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.remove(user, next);
            }
        });
    };

    users.getByEmail = function (email, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.findOne({email: email}, next);
            }
        });
    };

    users.getById = function (id, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.findOne({_id: id}, next);
            }
        });
    };

})(module.exports);