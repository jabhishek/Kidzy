// reference: https://code.angularjs.org/1.2.18/docs/api/ng/function/angular.element#jquery-jqlite-extras

describe("parentView directive", function () {
    "use strict";
    var element, scope, $compile, KidsService, $q, controller, injector;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('main/parentView/parentView.html'));
    beforeEach(module('main/parentView/child/child.html'));

    function simulateGetKidsPromise(obj, data) {
        "use strict";
        var deferred = $q.defer();
        if (obj.resolve) {
            deferred.resolve(data);
        } else {
            deferred.reject();
        }

        spyOn(KidsService, 'getAll').and.returnValue(deferred.promise);
    }

    beforeEach(inject(function ($rootScope, _$compile_, _KidsService_, _$q_) {
        KidsService = _KidsService_;
        $q = _$q_;
        $compile = _$compile_;

        simulateGetKidsPromise({resolve: true}, [{name: 'Vatsal'}, {name: 'Avni'}]);

        scope = $rootScope.$new();
        var template = angular.element('<parent-view></parent-view>');
        element = $compile(template)(scope);
        scope.$digest();

        controller = template.controller('parentView');
    }));

    it("should have a div", function () {
        expect(element.find('div')).toBeDefined();
    });

    it("controller should have kids defined", function () {
        expect(controller.kids).toBeDefined();
    });

    it("controller - kids should have length 2", function () {
        expect(controller.kids.length).toBe(2);
    });
});

