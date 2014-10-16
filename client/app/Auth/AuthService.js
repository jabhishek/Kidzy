(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, $cookieStore, UserService) {
        var obj, isLoggedInPromise;
        var currUser = {};

        obj = {
            login: login,
            logout: logout,
            getCurrentUser: function () {
                return currUser;
            },
            setCurrentUser: function (user) {
                currUser = user;
            },
            isLoggedIn: isLoggedIn,
            isLoggedInPromise: isLoggedInPromise,
            hasRole: hasRole
        };

        init();
        return obj;

        /// local methods ////

        function isLoggedIn() {
            return currUser.hasOwnProperty('role');
        }

        function hasRole(roleRequired) {
            if (!currUser) {
                return false;
            }
            if (!obj.isLoggedIn()) {
                return false;
            }
            return currUser.role === roleRequired;
        }

        function init() {
            if ($cookieStore.get('token')) {
                isLoggedInPromise = UserService.getLoggedInUser();
                isLoggedInPromise.then(function (userData) {
                    currUser = userData.user;
                });
            }
        }

        function logout() {
            currUser = {};
            $cookieStore.remove('token');
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    $cookieStore.put('token', data.token);
                    isLoggedInPromise = UserService.getLoggedInUser();
                    isLoggedInPromise.then(function (userData) {
                        currUser = userData.user;
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

