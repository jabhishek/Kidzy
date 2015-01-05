describe("navBar directive", function () {
    "use strict";
    var element, scope, $compile, $httpBackend;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('Common/NavBar/NavBar.html'));
    beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('login/login.html', '');

        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: { role: 'parent'}});
        scope = $rootScope.$new();

        $compile = _$compile_;

        var template = '<div aj-navbar=""></div>';
        element = $compile(template)(scope);
        scope.$digest();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should have a header", function () {
        expect(element.find('header')).toBeDefined();
    });

    it("nav should have class collapsed", function () {
        scope.navBarVm.isCollapsed = true;
        scope.navBarVm.Auth.setCurrentUser({ name: 'test', role: 'admin'});
        scope.$digest();
        expect(element.find('nav').attr('class')).toContain('collapsed');
    });

    it("nav-toggle should not be displayed if user not logged in", function () {
        scope.navBarVm.Auth.setCurrentUser({ });
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('.nav-toggle')).length).toEqual(0);
    });

    it("nav should not have class collapsed if isCollapsed is false", function () {
        inject(function(AuthService) {
            spyOn(AuthService, 'isLoggedIn').and.returnValue(true);
            scope.navBarVm.isCollapsed = false;
            scope.$digest();
            var className = element.find('nav').attr('class') || '';
            expect(className).not.toContain('collapsed');
        });

    });

    it("should have user name populated if user is logged in", function () {

        scope.navBarVm.Auth.setCurrentUser({ name: 'test', role: 'admin'});
        scope.$digest();
        var elem = element[0];
        // converted to uppercase because of the filter
        expect(angular.element(elem.querySelector('.user-info')).text()).toEqual('test');
    });

    it("should display main tab if user is logged in", function () {
        scope.navBarVm.Auth.setCurrentUser({ name: 'test', role: 'admin'});
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .main')).length).toEqual(1);
    });

    it("should not display main tab if user is not logged in", function () {
        scope.navBarVm.Auth.setCurrentUser({});
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .main')).length).toEqual(0);
    });

    it("should display logout tab if user is logged in", function () {
        scope.navBarVm.Auth.setCurrentUser({ name: 'test', role: 'admin'});
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .logout')).length).toEqual(1);
    });

    it("should not display logout tab if user is not logged in", function () {
        scope.navBarVm.Auth.setCurrentUser({ });
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .logout')).length).toEqual(0);
    });

    it("should call AuthService.logout if logout called", function () {
        inject(function(AuthService) {
            spyOn(AuthService, 'logout');
            scope.navBarVm.logout();
            expect(AuthService.logout).toHaveBeenCalled();
            expect(scope.navBarVm.isCollapsed).toBe(true);
        });
    });
});

