(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate', 'LocalStorageModule', 'ngAria', 'ngMaterial'])
        .constant('StateErrorCodes', {
            Unauthenticated: 'User not authenticated',
            Unauthorized: 'Unauthorized'
        })
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $animateProvider) {
            $animateProvider.classNameFilter(/animate/);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'main/main.html',
                    controller: 'MainController as mainVm',
                    controllerAs: 'mainVm',
                    resolve: {
                        isAuthenticated: isAuthenticated
                    }
                })
                .state('unauthorized', {
                    url: '/unauthorized',
                    templateUrl: 'Unauthorized.html'
                })
                .state('404', {
                    url: '/notFound',
                    templateUrl: '404.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'LoginController as loginVm',
                    controllerAs: 'loginVm',
                    resolve: {
                        // clear login data if already logged in
                        isAlreadyLoggedIn: isAlreadyLoggedIn
                    }
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'Register/register.html',
                    controller: 'RegisterController as registerVm',
                    controllerAs: 'registerVm',
                    resolve: {
                        // clear login data if already logged in
                        isAlreadyLoggedIn: isAlreadyLoggedIn
                    }
                })
                .state('log', {
                    url: '/log',
                    templateUrl: 'log/log.html',
                    controller: 'LogController as logVm',
                    controllerAs: 'logVm'
                });

            $urlRouterProvider.otherwise('/notFound');

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $httpProvider.interceptors.push('authInterceptor');

            function isAlreadyLoggedIn(AuthService, $q, StorageService, logger) {
                var defer = $q.defer();
                if (StorageService.getAuthToken()) {
                    AuthService.isLoggedInPromise().then(function () {
                        // clear login data if already logged in and navigating to login
                        logger.logMessage({message: 'logging out', caller: 'app - isAlreadyLoggedIn'});
                        AuthService.logout();
                        defer.resolve();
                    }, function () {
                        defer.resolve();
                    });
                } else {
                    defer.resolve();
                }
                return defer.promise;
            }

            function isAuthenticated(AuthService, $q, StateErrorCodes, logger) {
                /*jshint validthis: true */
                var defer = $q.defer();
                var stateTo = this.self;
                if (!AuthService.isLoggedInPromise()) {
                    logger.logMessage({message: 'not logged in', caller: 'app - isAuthenticated'});
                    defer.reject({message: StateErrorCodes.Unauthenticated, next: 'login'});
                } else {
                    AuthService.isLoggedInPromise().then(function (userData) {
                        if (stateTo && stateTo.role) {
                            if (stateTo.role === userData.user.role) {
                                defer.resolve(userData.user.role);
                            } else {
                                logger.logMessage({message: 'not authorized to the page.', caller: 'app - isAuthenticated'});
                                defer.reject({message: StateErrorCodes.Unauthorized, next: 'unauthorized'});
                            }
                        } else {
                            defer.resolve(userData.user.role);
                        }
                    }, function () {
                        logger.logMessage({message: 'Loggedin promise returned error', caller: 'app - isAuthenticated'});
                        defer.reject({message: StateErrorCodes.Unauthenticated, next: 'login'});
                    });
                }
                return defer.promise;
            }
        })
        .run(function ($rootScope, StateErrorCodes, $state) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.next) {
                    $state.transitionTo(error.next);
                }
            });
        });

})();