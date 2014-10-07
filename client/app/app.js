(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies'])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'main/main.html',
                    controller: 'mainController as mainVm'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'loginController as loginVm'
                });

            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode({enabled: true,
                requireBase: false});

            $httpProvider.interceptors.push('authInterceptor');
        })

        .factory('authInterceptor', function ($rootScope, $q, $cookieStore) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        console.log("token added");
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                }
            };
        });
})();