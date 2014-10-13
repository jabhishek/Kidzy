/* globals describe, it, expect */

describe('App', function () {
    'use strict';
    var app, appName;
    appName = 'HousePointsApp';
    // Initialize the controller and a mock scope
    beforeEach(inject(function () {
        app = angular.module(appName);
    }));

    it('to be defined', function () {
        expect(app).toBeDefined();
    });

    describe("dependencies", function () {
        var deps;

        beforeEach(inject(function () {
            app = angular.module(appName);
            deps = app.value(appName).requires;
        }));

        function hasModule(module) {
            return deps.indexOf(module) > -1;
        }

        it("should have ui.router as a dependency", function () {
            expect(hasModule('ui.router')).toBe(true);
        });
        it("should have restangular as a dependency", function () {
            expect(hasModule('restangular')).toBe(true);
        });
        it("should have ngCookies as a dependency", function () {
            expect(hasModule('ngCookies')).toBe(true);
        });
        it("should have ngAnimate as a dependency", function () {
            expect(hasModule('ngAnimate')).toBe(true);
        });
    });
});

describe("routes", function () {
    var app, $state, $rootScope;
    var appName = 'HousePointsApp';
    beforeEach(module(appName));
    beforeEach(inject(function (_$state_, _$rootScope_, $templateCache) {
        app = angular.module(appName);
        $state = _$state_;
        $rootScope = _$rootScope_;
        $templateCache.put('main/main.html', '');
        $templateCache.put('admin/admin.html', '');
        $templateCache.put('login/login.html', '');
    }));

    it("should have url / configured for state main", function () {
        expect($state.href('main')).toEqual('/');
    });

    it("should have url /admin configured for state admin", function () {
        expect($state.href('admin')).toEqual('/admin');
    });

    it("should have url /login configured for state login", function () {
        expect($state.href('login')).toEqual('/login');
    });

    it("should have controller mainController configured for state main", function () {
        $state.go('main');
        $rootScope.$digest();
        expect($state.current.controller).toEqual('mainController as mainVm');
    });

    it("should have controller loginController configured for state login", function () {
        $state.go('login');
        $rootScope.$digest();
        expect($state.current.controller).toEqual('loginController as loginVm');
    });

    it("should have controller adminController configured for state admin", function () {
        $state.go('admin');
        $rootScope.$digest();
        expect($state.current.controller).toEqual('adminController as adminVm');
    });
});

describe("interceptor", function () {
    var AuthService, authInterceptor, $httpProvider, $httpBackend, $timeout, $cookieStore;
    var appName = 'HousePointsApp';
    beforeEach(module(appName, function (_$httpProvider_) {
        "use strict";
        $httpProvider = _$httpProvider_;
    }));

    beforeEach(inject(function (_$httpBackend_, _authInterceptor_, _AuthService_, _$timeout_, _$cookieStore_) {
        $httpBackend = _$httpBackend_;
        authInterceptor = _authInterceptor_;
        AuthService = _AuthService_;
        $timeout = _$timeout_;
        $cookieStore = _$cookieStore_;

        $httpBackend.when('GET', '/api/users/me').respond(200, {});
        $httpBackend.flush();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should have authInterceptor registered", function () {
        expect($httpProvider.interceptors).toContain('authInterceptor');
    });

    it("should set the token in authorization header if token set in cookie", function () {
        "use strict";
        $cookieStore.put("token", "someToken");
        var config = authInterceptor.request({ header: {}});
        expect(config.headers["Authorization"]).toBe("Bearer someToken")
    });

    it("should not set the token in authorization header if token not present in cookie", function () {
        "use strict";
        $cookieStore.remove("token");
        var config = authInterceptor.request({ header: {}});
        expect(config.headers["Authorization"]).toBe(undefined);
    });
});


