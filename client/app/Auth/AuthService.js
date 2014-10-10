(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, $cookieStore, UserService) {
        var obj = {
            login: login,
            logout: logout,
            currentUser: getCurrentUser()
        };

        function getCurrentUser() {
            UserService.getLoggedInUser().then(function (userData) {
                obj.currentUser = userData.user;
            });
        }

        return obj;

        function logout() {
            obj.currentUser = {};
            $cookieStore.remove('token');
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    $cookieStore.put('token', data.token);
                    deferred.resolve();
                    getCurrentUser();
                })
                .error(function (err) {
                    $cookieStore.remove('token');
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

