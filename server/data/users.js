/**
 * Created by ajain on 04/09/2014.
 */

(function (users) {
    "use strict";
    var database = require("./database");
    var ObjectID = require('mongodb').ObjectID;

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

    users.getByUserName = function (username, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.findOne({username: username}, next);
            }
        });
    };

    users.getById = function (id, next) {
        id = id.toString();
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.findOne({'_id': new ObjectID(id)}, next);
            }
        });
    };

    users.updateUserNameWithEmail = function (email, next) {
        database.getDb(function getDbBack (err, theDb) {
            if (err) {
                next(err);
            } else {
                theDb.users.update({ 'email': email }, { $set: { "username": email } }, next);
            }
        });
    };

})(module.exports);