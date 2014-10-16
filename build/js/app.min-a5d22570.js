(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate'])
        .constant('StateErrorCodes', {
            Unauthorized: 'Unauthorized',
            AlreadyLoggedIn: 'AlreadyLoggedIn'
        })
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
            isLoggedIn.$inject = ["AuthService", "$cookieStore", "$q", "StateErrorCodes"];

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
            isAuthenticated.$inject = ["AuthService", "$q", "StateErrorCodes"];
        }])
        .run(["$rootScope", "StateErrorCodes", "$state", function($rootScope, StateErrorCodes, $state) {
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
        }])
        .factory('authInterceptor', ["$rootScope", "$q", "$cookieStore", "$location", function ($rootScope, $q, $cookieStore, $location) {
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
        }]);
})();
(function (app) {
    'use strict';
    app.factory('AuthService', ["$http", "$q", "$cookieStore", "UserService", function ($http, $q, $cookieStore, UserService) {
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
    }]);
})(angular.module('HousePointsApp'));


(function (app) {
    'use strict';
    app.factory('UserService', ["Restangular", function (Restangular) {
        var users = Restangular.all('api/users');
        return {
            getLoggedInUser: getLoggedInUser,
            getAllUsers: getAllUsers
        };

        function getLoggedInUser() {
            return users.one('me').get();
        }

        function getAllUsers() {
            return users.getList();
        }
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('adminController', ["AuthService", function (AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('ajNavbar', ["AuthService", "$state", function (AuthService, $state) {
        return {
            restrict: 'EA',
            templateUrl: 'NavBar/NavBar.html',
            controller: function() {
                var vm = this;
                vm.isCollapsed = true;
                vm.Auth = AuthService;

                vm.logout = function() {
                    vm.Auth.logout();
                    vm.isCollapsed = true;
                    $state.go('login');
                };
            },
            controllerAs: 'navBarVm'
        };
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('loginController', ["AuthService", "$state", function (AuthService, $state) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;
        vm.Auth = AuthService;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid) {
                return;
            }
            AuthService.login(user)
                .then(function () {
                    $state.go('main');
                }, function(err) {
                    vm.error = err;
                });
        }

        function init() {
            vm.user = {
                email: '',
                password: ''
            };
            vm.error = undefined;
            //vm.Auth.logout();
        }
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('mainController', ["AuthService", function(AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.filter('capitalize', function() {
        return function(input) {
            if (!input) {
                return '';
            }
            var firstChar = input.substring(0, 1).toUpperCase();
            return firstChar + input.substring(1);
        };
    });
})(angular.module('HousePointsApp'));