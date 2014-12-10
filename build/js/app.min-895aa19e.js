(function () {
    'use strict';
    angular.module('HousePointsApp', ['ui.router', 'ngCookies', 'restangular', 'ngAnimate', 'LocalStorageModule', 'ngAria', 'ngMaterial'])
        .constant('StateErrorCodes', {
            Unauthenticated: 'User not authenticated',
            Unauthorized: 'Unauthorized'
        })
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "$animateProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $animateProvider) {
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
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'admin/admin.html',
                    controller: 'AdminController as adminVm',
                    controllerAs: 'adminVm',
                    resolve: {
                        isAuthenticated: isAuthenticated,
                        Users: ["UserService", "isAuthenticated", function (UserService, isAuthenticated) {
                            return UserService.getAllUsers();
                        }]
                    },
                    role: 'admin'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'LoginController as loginVm',
                    controllerAs: 'loginVm',
                    resolve: {
                        // redirect to main page if already logged in
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
            isAlreadyLoggedIn.$inject = ["AuthService", "$q", "StorageService", "logger"];

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
                                defer.resolve();
                            } else {
                                logger.logMessage({message: 'not authorized to the page.', caller: 'app - isAuthenticated'});
                                defer.reject({message: StateErrorCodes.Unauthorized, next: 'unauthorized'});
                            }
                        } else {
                            defer.resolve();
                        }
                    }, function () {
                        logger.logMessage({message: 'Loggedin promise returned error', caller: 'app - isAuthenticated'});
                        defer.reject({message: StateErrorCodes.Unauthenticated, next: 'login'});
                    });
                }
                return defer.promise;
            }
            isAuthenticated.$inject = ["AuthService", "$q", "StateErrorCodes", "logger"];
        }])
        .run(["$rootScope", "StateErrorCodes", "$state", function ($rootScope, StateErrorCodes, $state) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.next) {
                    $state.transitionTo(error.next);
                }
            });
        }]);

})();
(function (app) {
    'use strict';
    app.controller('AdminController', ["Users", function (Users) {
        var vm = this;
        vm.users = [];
        if (angular.isArray(Users)) {
            Users.forEach(function(user) {
                vm.users.push(user);
            });
        }
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('ajUser', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              user: '='
            },
            templateUrl: 'admin/user.html'
        };
    });
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('emailAvailableValidator', ["$q", "$timeout", "UserService", "logger", function ($q, $timeout, UserService, logger) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$asyncValidators.emailAvailable = function(email) {
                    var defer = $q.defer();
                    UserService.checkUser(email)
                        .then(function(data) {
                            logger.logMessage({message: 'isAvailable: ' + data.available, caller: 'emailAvailableValidator'});
                            if (data.available) {
                                defer.resolve();
                            } else {
                                defer.reject();
                            }
                        });
                    return defer.promise;
                };
            }
        };
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('RegisterController', ["UserService", "$state", "AuthService", "logger", function (UserService, $state, AuthService, logger) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid) {
                return;
            }
            UserService.createUser(user)
                .then(function () {
                    logger.logMessage({message: 'redirecting to main', caller: 'RegisterController.submit'});
                    AuthService.login(user).then(function() {
                        $state.go('main');
                    });
                }, function() {
                    logger.logMessage({message: 'error creating user', caller: 'RegisterController.submit'});
                });
        }
        function init() {
            vm.user = {
                email: '',
                password: '',
                name: ''
            };
            vm.error = undefined;
        }
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('LoginController', ["AuthService", "$state", function (AuthService, $state) {
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
    app.controller('MainController', MainController);

    function MainController(AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    }
    MainController.$inject = ["AuthService"];
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.controller('LogController', ["logger", function (logger) {
        var vm = this;
        vm.logger = logger;
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    // todo-abhi - show navbar conditionslly
    app.directive('ajNavbar', ["AuthService", "$state", function (AuthService, $state) {
        return {
            restrict: 'EA',
            templateUrl: 'Common/NavBar/NavBar.html',
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
    app.factory('AuthService', ["$http", "$q", "UserService", "StorageService", "logger", function ($http, $q, UserService, StorageService, logger) {
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
            logger.logMessage({caller: 'AuthService.init', message: 'calling StorageService.getAuthToken'});
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
                    logger.logMessage({caller: 'AuthService.login', message: 'auth/local rejected'});
                    StorageService.removeAuthToken();
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }]);
})(angular.module('HousePointsApp'));


(function (app, undefined) {
    'use strict';
    app.factory('KidsService', ["Restangular", "$q", function (Restangular, $q) {

        var _kids;
        var kidsUrl = Restangular.all('api/kids');

        var obj = {
            getAll: getAll,
            setCachedKids: setCachedKids,
            clearCachedKids: clearCachedKids,
            getCachedKids: getCachedKids,
            getKidsFromServer: getKidsFromServer,
            addKid: addKid
        };
        return obj;

        // private functions
        function addKid(kid) {
            var defer = $q.defer();
            if (!kid || !angular.isObject(kid)) {
                defer.reject("Invalid parameters passed");
            }
            kidsUrl.post(kid).then(function kidsPostResolved(data) {
                defer.resolve(data);
            }, function kidsPostRejected(err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        function clearCachedKids() {
            setCachedKids(undefined);
        }

        function setCachedKids(kids) {
            _kids = kids;
        }

        function getCachedKids() {
            return _kids;
        }

        function getKidsFromServer() {
            return kidsUrl.get('');
        }

        function getAll() {
            var defer = $q.defer();
            if (_kids !== undefined && angular.isArray(_kids)) {
                console.log('getting data from cache');
                defer.resolve(_kids);
            } else {
                // get data from server
                console.log('get data from server');
                _kids = undefined;

                getKidsFromServer().then(function (data) {
                    _kids = data.kids;
                    defer.resolve(data.kids);
                }, function (err) {
                    defer.reject(err);
                });
            }
            return defer.promise;
        }
    }]);
})(angular.module('HousePointsApp'));

(function (app) {
    'use strict';
    app.factory('logger', function () {
        var logger = {};
        logger.messageLog = [];
        logger.logMessage = logMessage;
        logger.clear = clear;
        return logger;

        function logMessage(parameters) {
            var logEntry = new LogEntry(parameters);
            logger.messageLog.push(logEntry);
        }

        function clear() {
            logger.messageLog = [];
        }

        function LogEntry (parameters) {
            this.message = parameters.message || '';
            this.type = parameters.type || '';
            this.caller = parameters.caller || '';
            this.time = new Date();
        }
    });
})(angular.module('HousePointsApp'));

(function (app) {
    'use strict';
    app.factory('StorageService', ["localStorageService", "logger", function (localStorageService, logger) {
        var obj = {
            getAuthToken: getAuthToken,
            removeAuthToken: removeAuthToken,
            putAuthToken: putAuthToken
        };
        return obj;

        // private methods
        function getAuthToken() {
            logger.logMessage({message: 'StorageService.getAuthToken'});
            return localStorageService.get('token');
        }

        function removeAuthToken() {
            logger.logMessage({message: 'StorageService.removeAuthToken'});
            localStorageService.remove('token');
        }

        function putAuthToken(value) {
            logger.logMessage({message: 'StorageService.putAuthToken'});
            if (value === null || value === undefined) {
                return;
            }
            localStorageService.set('token', value);
        }
    }]);

})(angular.module('HousePointsApp'));

(function (app) {
    'use strict';
    app.factory('UserService', ["Restangular", "capitalizeFilter", "$q", function (Restangular, capitalizeFilter, $q) {

        var restAngular =
            Restangular.withConfig(function(Configurer) {
                Configurer.addResponseInterceptor(function(data, operation, what) {
                    var response = data;
                    if (operation === 'get' && what === 'me') {
                        response.user.name = capitalizeFilter(response.user.name);
                    }
                    if (operation === 'getList') {
                        response = data.users;
                    }
                    return response;
                });
            });
        var users = restAngular.all('api/users');

        return {
            getLoggedInUser: getLoggedInUser,
            getAllUsers: getAllUsers,
            checkUser: checkUser,
            createUser: createUser
        };

        function getLoggedInUser() {
            return users.one('me').get();
        }

        function createUser(user) {
            var defer = $q.defer();
            users.post(user).then(function resolved() {
                defer.resolve();
            }, function rejected() {
                defer.reject();
            });

            return defer.promise;
        }

        function getAllUsers() {
            return users.getList();
        }

        function checkUser(email) {
            return users.one('checkUser', email).get();
        }
    }]);
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.factory('authInterceptor', ["$rootScope", "$q", "StorageService", "$location", function ($rootScope, $q, StorageService, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if (StorageService.getAuthToken()) {
                    config.headers.Authorization = 'Bearer ' + StorageService.getAuthToken();
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
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
(function (app) {
    'use strict';
    app.directive('childView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/childView/childView.html'
        };
    });
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('parentView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/parentView/parentView.html',
            controller: ["KidsService", function(KidsService) {
                var vm = this;
                vm.kids = [];

                KidsService.getAll().then(function(kids) {
                    _.forEach(kids, function(kid) {
                        vm.kids.push(kid);
                    });
                    console.log(vm.kids);
                });
            }],
            controllerAs: 'kidsVm'
        };
    });
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('child', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/child/child.html',
            scope: {
                kid: '='
            }
        };
    });
})(angular.module('HousePointsApp'));
(function (app) {
    'use strict';
    app.directive('loader', ["$rootScope", "$timeout", "logger", function ($rootScope, $timeout, logger) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'Common/directives/loader/loader.html',
            link: function (scope, elem, attrs) {
                var hideLoaderTimeout;
                var minLoaderDisplayTime = attrs.minLoaderDisplay || 300;
                scope.data = {
                    startTime: undefined
                };

                var unregisterStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                    scope.data.startTime = new Date();
                    elem.removeClass('ng-hide');
                });

                var unregisterSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                    logger.logMessage({message: 'from ' + fromState.name + ' to ' + toState.name, caller: 'loader - $stateChangeSuccess'});
                    var transitionTime = new Date() - scope.data.startTime;
                    logger.logMessage({message: 'state Transition time: ' + transitionTime + ' ms', caller: 'loader - $stateChangeSuccess'});

                    var loaderTimeout = minLoaderDisplayTime - transitionTime;
                    loaderTimeout = loaderTimeout > 0 ? loaderTimeout : 0;
                    hideLoaderTimeout = $timeout(function () {
                        elem.addClass('ng-hide');
                    }, loaderTimeout);
                });

                var unregisterError = $rootScope.$on('$stateChangeError', function () {
                    elem.addClass('ng-hide');
                });

                scope.$on('destroy', function () {
                    logger.logMessage({message: 'unregistering', caller: 'loader - destroy'});
                    unregisterStart();
                    unregisterSuccess();
                    unregisterError();
                    $timeout.cancel(hideLoaderTimeout);
                });
            }
        };
    }]);
})(angular.module('HousePointsApp'));