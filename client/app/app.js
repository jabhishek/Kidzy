(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate', 'LocalStorageModule', 'ngAria', 'ngMaterial'])
        .constant('StateErrorCodes', {
            Unauthenticated: 'User not authenticated',
            Unauthorized: 'Unauthorized'
        })
		.constant("configData", {
			// expiry in minutes
			kidsDataLifeSpan: 1*60*1000
		})
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $animateProvider, $compileProvider) {
            $animateProvider.classNameFilter(/animate/);

            // disable debug info in html (example, disables insertion of classes like ng-scope, ng-binding)
            $compileProvider.debugInfoEnabled(false);

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
                })
                .state('kids', {
                    abstract: true,
                    url: '/child',
                    template: '<ui-view/>'
                })
                .state('kids.add', {
                    url: '/add',
                    templateUrl: 'main/AddChild/add-child.html',
                    controller: 'addChildController as childCtrl',
                    controllerAs: 'childCtrl'
                })
                .state('kids.display', {
                    url: '/:childId',
                    template: '<div>Child Details - To do</div>'
                });

            $urlRouterProvider.otherwise('/notFound');

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $httpProvider.interceptors.push('authInterceptor');

            function isAlreadyLoggedIn(AuthService, $q, StorageService) {
                var defer = $q.defer();
                if (StorageService.getAuthToken()) {
                    AuthService.isLoggedInPromise().then(function () {
                        // clear login data if already logged in and navigating to login
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

            function isAuthenticated(AuthService, $q, StateErrorCodes) {
                /*jshint validthis: true */
                var defer = $q.defer();
                var stateTo = this.self;
                if (!AuthService.isLoggedInPromise()) {
                    defer.reject({message: StateErrorCodes.Unauthenticated, next: 'login'});
                } else {
                    AuthService.isLoggedInPromise().then(function (userData) {
                        if (stateTo && stateTo.role) {
                            if (stateTo.role === userData.user.role) {
                                defer.resolve(userData.user.role);
                            } else {
                                defer.reject({message: StateErrorCodes.Unauthorized, next: 'unauthorized'});
                            }
                        } else {
                            defer.resolve(userData.user.role);
                        }
                    }, function () {
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