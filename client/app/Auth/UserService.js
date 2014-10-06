(function (app) {
    'use strict';
    app.factory('UserService', function () {
        return {
            getLoggedInUser: getLoggedInUser
        };

        function getLoggedInUser() {
            return $http.get("api/users/me");
        }
    });
})(angular.module('HousePointsApp'));

