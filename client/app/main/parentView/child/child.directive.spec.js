// reference: https://code.angularjs.org/1.2.18/docs/api/ng/function/angular.element#jquery-jqlite-extras

describe("childView directive", function () {
    "use strict";
    var element, scope, $compile, controller;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('main/parentView/child/child.html'));

    beforeEach(inject(function ($rootScope, _$compile_, _KidsService_, _$q_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        var template = angular.element('<child kid="kid"></child>');
        scope.kid = { name: 'vatsal' };
        element = $compile(template)(scope);
        scope.$digest();

        controller = template.controller('child');
    }));

    it("should be defined", function () {
        expect(element).toBeDefined();
    });

    it("should have the name converted to upper case", function () {
        var nameElement = angular.element(element[0].querySelector('span.name'));
        expect(nameElement.length).toEqual(1);
        expect(nameElement.text()).toEqual('Vatsal');
    });
});

