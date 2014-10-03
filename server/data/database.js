(function (database) {
    'use strict';
    var uri = require('../config/environment').mongo.uri;

    console.log(uri);

    var mongoDb = require('mongodb');
    var theDb = null;
    database.getDb = function(next) {
        if (!theDb) {
            mongoDb.MongoClient.connect(uri, function(err, db) {
                if (err) {
                    next(err);
                } else {
                    theDb = {
                        db: db,
                        users: db.collection("users")
                    };
                    next(null, theDb);
                }
            })
        } else {
            next(null, theDb);
        }

    };

})(module.exports);
