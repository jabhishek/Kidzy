(function (app) {
    'use strict';
    app.factory('AuthService', function ($http, $q, UserService, StorageService, logger) {
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
            isLoggedInPromise: function() {
                return isLoggedInPromise;
            },
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
            logger.logMessage({caller: 'AuthService.init'});

            if (StorageService.getAuthToken()) {
                isLoggedInPromise = UserService.getLoggedInUser();
                isLoggedInPromise.then(function (userData) {
                    currUser = userData.user;
                });
            }
        }

        function logout() {
            logger.logMessage({caller: 'AuthService.logout'});
            currUser = {};
            isLoggedInPromise = undefined;
            StorageService.removeAuthToken();
        }

        function login(user) {
            logger.logMessage({caller: 'AuthService.login'});
            var deferred = $q.defer();
            $http.post('/auth/local', user)
                .success(function (data) {
                    StorageService.putAuthToken(data.token);
                    isLoggedInPromise = UserService.getLoggedInUser();
                    isLoggedInPromise.then(function (userData) {
                        currUser = userData.user;
                        deferred.resolve();
                    }, function(err) {
                        deferred.reject(err);
                    });
                })
                .error(function (err) {
                    StorageService.removeAuthToken();
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    });
})(angular.module('HousePointsApp'));

