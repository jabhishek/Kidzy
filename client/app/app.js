(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate'])
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

        .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                },
                responseError: function (response) {
                    console.group('response error');
                    console.log(response);
                    console.groupEnd();
                    if (response.status === 401) {
                        $location.path('/login');
                        // remove any stale tokens
                        $cookieStore.remove('token');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        });
})();