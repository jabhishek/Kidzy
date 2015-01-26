(function (app) {
    'use strict';
    app.factory('StorageService', function (localStorageService) {
        var obj = {
            getAuthToken: getAuthToken,
            removeAuthToken: removeAuthToken,
            putAuthToken: putAuthToken
        };
        return obj;

        // private methods
        function getAuthToken() {
            return localStorageService.get('token');
        }

        function removeAuthToken() {
            localStorageService.remove('token');
        }

        function putAuthToken(value) {
            if (value === null || value === undefined) {
                return;
            }
            localStorageService.set('token', value);
        }
    });

})(angular.module('HousePointsApp'));
