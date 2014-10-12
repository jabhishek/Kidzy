describe("navBar directive", function () {
    "use strict";
    var element, scope;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('NavBar/NavBar.html'));

    beforeEach(inject(function($rootScope, $compile, $httpBackend) {
        $httpBackend.when('GET', '/api/users/me').respond(200, {});
        scope = $rootScope.$new();

        element = angular.element('<div aj-navbar=""></div>');

        scope.isCollapsed = true;

        element = $compile(element)(scope);
        scope.$digest();
    }));

    it("should have header", function() {
        expect(element.find('header')).toBeDefined();
    })
});
