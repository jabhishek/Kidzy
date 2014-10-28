/**
 * Created by ajain on 04/09/2014.
 */

var kids = require("./kids");
var users = require("./users");
var hasher = require("../api/auth/hasher");
(function (index) {
    index.users = users;
    index.kids = kids;

    function seedDatabase() {
        "use strict";
        users.remove({}, function (err) {
            if (err)
                console.log(err);
        });

        var salt = hasher.createSalt(8);
        users.add({
            email: 'test@test.com',
            provider: 'local',
            role: 'parent',
            name: 'test user',
            salt: salt,
            hashedPassword: hasher.computeHash("test", salt)
        }, function (err) {
            if (err)
                console.log(err);
        });

        salt = hasher.createSalt(8);
        users.add({
            email: 'admin@admin.com',
            provider: 'local',
            role: 'admin',
            name: 'admin',
            salt: salt,
            hashedPassword: hasher.computeHash("admin", salt)
        }, function (err) {
            if (err)
                console.log(err);
        });

        salt = hasher.createSalt(8);
        users.add({
            email: 'child@child.com',
            provider: 'local',
            role: 'child',
            name: 'kiddo',
            salt: salt,
            hashedPassword: hasher.computeHash("child", salt)
        }, function (err) {
            if (err)
                console.log(err);
        });

    }

    function addKids() {
        "use strict";

        kids.remove({}, function (err) {
            if (err)
                console.log(err);
        });
        users.getByEmail('test@test.com', function(err, user) {
            console.log('user:');
            console.log(user);
            kids.add({
                parentId: user._id,
                childName: 'test child'
            }, function(err, response) {

            });
            kids.add({
                parentId: user._id,
                childName: 'test child 2'
            }, function(err, response) {

            });
        })
    }
    //seedDatabase();
    addKids();
})(module.exports);