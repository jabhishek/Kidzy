(function (app) {
    'use strict';
    app.factory('UserService', function (Restangular) {
        var users = Restangular.all('api/users');
        return {
            getLoggedInUser: getLoggedInUser,
            getAllUsers: getAllUsers
        };

        function getLoggedInUser() {
            return users.one('me').get();
        }

        function getAllUsers() {
            return users.getList();
        }
    });
})(angular.module('HousePointsApp'));