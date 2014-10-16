(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate'])
        .constant('StateErrorCodes', {
            Unauthorized: 'Unauthorized',
            AlreadyLoggedIn: 'AlreadyLoggedIn'
        })
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'main/main.html',
                    controller: 'mainController as mainVm',
                    resolve: {
                        isAuthenticated: isAuthenticated
                    }
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'admin/admin.html',
                    controller: 'adminController as adminVm',
                    resolve: {
                        isAuthenticated: isAuthenticated
                    },
                    role: 'admin'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'loginController as loginVm',
                    resolve: {
                        isLoggedIn: isLoggedIn
                    }
                });

            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode({enabled: true,
                requireBase: false});

            $httpProvider.interceptors.push('authInterceptor');

            function isLoggedIn(AuthService, $cookieStore, $q, StateErrorCodes) {
                var defer = $q.defer();
                if ($cookieStore.get('token')) {
                    AuthService.isLoggedInPromise().then(function () {
                        defer.reject(StateErrorCodes.AlreadyLoggedIn);
                    }, function() {
                        defer.resolve();
                    });
                } else {
                    defer.resolve();
                }
                return defer.promise;
            }

            function isAuthenticated(AuthService, $q, StateErrorCodes) {
                /*jshint validthis: true */
                var defer = $q.defer();
                var stateTo = this.self;
                if (!AuthService.isLoggedInPromise()) {
                    console.log('not authorized 1');
                    defer.reject(StateErrorCodes.Unauthorized);
                    //$state.go('login');
                } else {
                    AuthService.isLoggedInPromise().then(function(userData) {
                        if (stateTo && stateTo.role) {
                            if (stateTo.role === userData.user.role) {
                                defer.resolve();
                            } else {
                                console.log('not authorized 2');
                                //            $state.go('login');
                                defer.reject(StateErrorCodes.Unauthorized);
                            }
                        } else {
                            defer.resolve();
                        }
                    }, function() {
                        console.log('not authorized 3');
                        //       $state.go('login');
                        defer.reject(StateErrorCodes.Unauthorized);
                    });
                }
                return defer.promise;
            }
        })
        .run(function($rootScope, StateErrorCodes, $state) {
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                switch (toState.name) {
                    case 'admin':
                        if (error === StateErrorCodes.Unauthorized) {
                            $state.transitionTo('login');
                        }
                        break;
                    case 'main':
                        if (error === StateErrorCodes.Unauthorized) {
                            $state.transitionTo('login');
                        }
                        break;
                    case 'login':
                        if (error === StateErrorCodes.AlreadyLoggedIn) {
                            $state.transitionTo('main');
                        }
                        break;
                    default:
                        break;
                }

            });
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