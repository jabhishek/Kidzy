(function (app) {
    'use strict';
    app.factory('UserService', function (Restangular, capitalizeFilter) {
        var users = Restangular.all('api/users');

        Restangular.addResponseInterceptor(function(data, operation, what) {
            var response = data;
            if (operation === 'get' && what === 'me') {
                response.user.name = capitalizeFilter(response.user.name);
            }
            if (operation === 'getList') {
                response = data.users;
            }
            return response;
        });

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