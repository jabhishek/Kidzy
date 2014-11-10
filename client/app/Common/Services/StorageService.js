(function (app) {
    'use strict';
    app.factory('StorageService', function (localStorageService, logger) {
        var obj = {
            getAuthToken: getAuthToken,
            removeAuthToken: removeAuthToken,
            putAuthToken: putAuthToken
        };
        return obj;

        // private methods
        function getAuthToken() {
            logger.logMessage({caller: 'StorageService.getAuthToken'});
            return localStorageService.get('token');
        }

        function removeAuthToken() {
            logger.logMessage({caller: 'StorageService.removeAuthToken'});
            localStorageService.remove('token');
        }

        function putAuthToken(value) {
            logger.logMessage({caller: 'StorageService.putAuthToken'});
            if (value === null || value === undefined) {
                return;
            }
            localStorageService.set('token', value);
        }
    });

})(angular.module('HousePointsApp'));
