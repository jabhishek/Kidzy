(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, $cookieStore) {
        return {
            login: login
        };

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    $cookieStore.put('token', data.token);
                    deferred.resolve();
                })
                .error(function (err) {
                    $cookieStore.remove('token');
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

