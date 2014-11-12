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
            logger.logMessage({message: 'StorageService.getAuthToken'});
            return localStorageService.get('token');
        }

        function removeAuthToken() {
            logger.logMessage({message: 'StorageService.removeAuthToken'});
            localStorageService.remove('token');
        }

        function putAuthToken(value) {
            logger.logMessage({message: 'StorageService.putAuthToken'});
            if (value === null || value === undefined) {
                return;
            }
            localStorageService.set('token', value);
        }
    });

})(angular.module('HousePointsApp'));
