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
    }));

    it("should have url / configured for state main", function () {
        expect($state.href('main')).toEqual('/');
    });

    it("should have controller mainController configured for state main", function () {
        $state.go('main');
        $rootScope.$digest();
        expect($state.current.controller).toEqual('mainController as mainVm');
    });

    it("should have controller mainController configured for state main", function () {
        $state.go('main');
        $rootScope.$digest();
        expect($state.current.controller).toEqual('mainController as mainVm');
    });
});

