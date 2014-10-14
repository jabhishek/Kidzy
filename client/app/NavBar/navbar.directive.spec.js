describe("navBar directive", function () {
    "use strict";
    var element, scope, $compile;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('NavBar/NavBar.html'));

    beforeEach(inject(function ($rootScope, _$compile_, $httpBackend) {
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: { role: 'parent'}});
        scope = $rootScope.$new();

        $compile = _$compile_;

        var template = '<div aj-navbar=""></div>';
        element = $compile(template)(scope);
        scope.$digest();
    }));

    it("should have a header", function () {
        expect(element.find('header')).toBeDefined();
    });

    it("nav should have class collapsed", function () {
        scope.navBarVm.isCollapsed = true;
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        expect(element.find('nav').attr('class')).toContain('collapsed');
    });

    it("nav-toggle should not be displayed if user not logged in", function () {
        scope.navBarVm.Auth.currentUser = { };
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('.nav-toggle')).length).toEqual(0);
    });

    it("nav should not have class collapsed if isCollapsed is false", function () {
        scope.navBarVm.isCollapsed = false;
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        expect(element.find('nav').attr('class')).not.toContain('collapsed');
    });

    it("should have user name populated if user is logged in", function () {
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('.user')).text()).toEqual('test');
    });

    it("should not display admin tab if user is not logged in", function () {
        scope.navBarVm.Auth.currentUser = {};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .admin')).length).toEqual(0);
    });

    it("should display admin tab if user is admin", function () {
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .admin')).length).toEqual(1);
    });

    it("should not display admin tab if user is logged in but not admin", function () {
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'parent'};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .admin')).length).toEqual(0);
    });

    it("should display main tab if user is logged in", function () {
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .main')).length).toEqual(1);
    });

    it("should not display main tab if user is not logged in", function () {
        scope.navBarVm.Auth.currentUser = {};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .main')).length).toEqual(0);
    });

    it("should display logout tab if user is logged in", function () {
        scope.navBarVm.Auth.currentUser = { name: 'test', role: 'admin'};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('nav .logout')).length).toEqual(1);
    });

    it("should not display logout tab if user is not logged in", function () {
        scope.navBarVm.Auth.currentUser = {};
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

