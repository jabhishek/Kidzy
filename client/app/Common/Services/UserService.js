(function (app) {
    'use strict';
    app.factory('UserService', function (Restangular, capitalizeFilter) {

        var restAngular =
            Restangular.withConfig(function(Configurer) {
                Configurer.addResponseInterceptor(function(data, operation, what) {
                    var response = data;
                    if (operation === 'get' && what === 'me') {
                        response.user.name = capitalizeFilter(response.user.name);
                    }
                    if (operation === 'getList') {
                        response = data.users;
                    }
                    return response;
                });
            });
        var users = restAngular.all('api/users');

        return {
            getLoggedInUser: getLoggedInUser,
            getAllUsers: getAllUsers,
            checkUser: checkUser
        };

        function getLoggedInUser() {
            return users.one('me').get();
        }

        function getAllUsers() {
            return users.getList();
        }

        function checkUser(email) {
            return users.one('checkUser', email).get();
        }
    });
})(angular.module('HousePointsApp'));