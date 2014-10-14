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
            return obj.currentUser.hasOwnProperty("role");
        }

        function hasRole(roleRequired) {
            if (!obj.currentUser) return false;
            if (!obj.isLoggedIn()) return false;
            if (obj.currentUser.role === roleRequired) return true;
            return false;
        }

        function init() {
            console.log('init');
            setCurrentUser();
        }

        function setCurrentUser() {
            UserService.getLoggedInUser().then(function (userData) {
                if ($cookieStore.get('token')) {
                    console.log('setting user');
                    obj.currentUser = userData.user;
                }
            });
        }

        function logout() {
            console.log('logging out');
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

