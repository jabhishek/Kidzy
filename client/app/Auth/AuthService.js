(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, $cookieStore, UserService) {
        var obj = {
            login: login,
            logout: logout,
            currentUser: {},
            isLoggedIn: isLoggedIn,
            hasRole: hasRole
        };

        init();
        return obj;

        /// local methods ////

        function isLoggedIn() {
            return obj.currentUser.hasOwnProperty('role');
        }

        function hasRole(roleRequired) {
            if (!obj.currentUser) {
                return false;
            }
            if (!obj.isLoggedIn()) {
                return false;
            }
            return obj.currentUser.role === roleRequired;
        }

        function init() {
            setCurrentUser();
        }

        function setCurrentUser() {
            UserService.getLoggedInUser().then(function (userData) {
                if ($cookieStore.get('token')) {
                    obj.currentUser = userData.user;
                }
            });
        }
        function logout() {
            obj.currentUser = {};
            $cookieStore.remove('token');
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    $cookieStore.put('token', data.token);
                    UserService.getLoggedInUser().then(function (userData) {
                        obj.currentUser = userData.user;
                        console.log("resolved");
                        deferred.resolve();
                    }, function(err) {
                        deferred.reject(err);
                    });
                })
                .error(function (err) {
                    $cookieStore.remove('token');
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

