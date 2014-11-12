describe("parentView directive", function () {
    "use strict";
    var element, scope, $compile;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('main/parentView.html'));

    beforeEach(inject(function ($rootScope, _$compile_, $httpBackend) {
        $httpBackend.when('GET', '/api/kids').respond(200, []);
        scope = $rootScope.$new();

        $compile = _$compile_;

        var template = '<parent-view></parent-view>';
        element = $compile(template)(scope);
        scope.$digest();
    }));

    it("should have a div", function () {
        expect(element.find('div')).toBeDefined();
    });
});

