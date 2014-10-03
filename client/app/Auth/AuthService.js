(function (app) {
    'use strict';


    app.factory('AuthService', function ($http, $q, $cookieStore) {
        var isLoggedIn = false;
        return {
            login: login,
            logout: logout,
            isLoggedIn: function () {
                return isLoggedIn;
            }
        };

        function logout() {
            $cookieStore.remove('token');
            isLoggedIn = false;
        };

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    $cookieStore.put('token', data.token);
                    isLoggedIn = true;
                    // todo-abhi - get user
                    deferred.resolve(data);
                })
                .error(function (err) {
                    // todo-abhi - delete the token
                    logout();
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

