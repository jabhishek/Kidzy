(function (app) {
    'use strict';
    app.factory('CookieService', function ($cookieStore) {
        var obj = {
            getAuthToken: getAuthToken,
            removeAuthToken: removeAuthToken,
            putAuthToken: putAuthToken
        };
        return obj;

        // private methods
        function getAuthToken() {
            return $cookieStore.get('token');
        }

        function removeAuthToken() {
            $cookieStore.remove('token');
        }

        function putAuthToken(value) {
            if (value === null || value === undefined) {
                return;
            }
            $cookieStore.put('token', value);
        }
    });

})(angular.module('HousePointsApp'));
