(function (app) {
    app.factory('authInterceptor', function ($rootScope, $q, StorageService, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if (StorageService.getAuthToken()) {
                    config.headers.Authorization = 'Bearer ' + StorageService.getAuthToken();
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    });
})(angular.module('HousePointsApp'));
