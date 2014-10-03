(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies'])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
        });
})();