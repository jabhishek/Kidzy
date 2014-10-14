describe("navBar directive", function () {
    "use strict";
    var element, scope, $compile;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('NavBar/NavBar.html'));

    beforeEach(inject(function ($rootScope, _$compile_, $httpBackend) {
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: {}});
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
        scope.navBarVm = {isCollapsed: true};
        scope.$digest();
        expect(element.find('nav').attr('class')).toContain('collapsed');
    });

    it("nav should not have class collapsed if isCollapsed is false", function () {
        console.log(scope.navBarVm);
        scope.navBarVm = {isCollapsed: false};
        scope.$digest();
        expect(element.find('nav').attr('class')).not.toContain('collapsed');
    });

    it("should have user name populated if auth has currentUser populated", function () {
        scope.navBarVm = {Auth: { currentUser: { name: 'test'}}};
        scope.$digest();
        var elem = element[0];
        expect(angular.element(elem.querySelector('.user')).text()).toEqual('test');
    });
});

