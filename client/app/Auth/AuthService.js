(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, $cookieStore, UserService) {
        var obj = {
            login: login,
            logout: logout,
            currentUser: {}
        };

        init();


        function init() {
            setCurrentUser();
        }

        function setCurrentUser() {
            UserService.getLoggedInUser().then(function (userData) {
                console.log(userData.user);
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
                    setCurrentUser();
                })
                .error(function (err) {
                    $cookieStore.remove('token');
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

