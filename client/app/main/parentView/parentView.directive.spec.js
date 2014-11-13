// reference: https://code.angularjs.org/1.2.18/docs/api/ng/function/angular.element#jquery-jqlite-extras

describe("parentView directive", function () {
    "use strict";
    var element, scope, $compile, KidsService, $q, controller, injector;

    beforeEach(module('HousePointsApp'));
    beforeEach(module('main/parentView/parentView.html'));
    beforeEach(module('main/child/child.html'));

    function simulateGetKidsPromise(obj) {
        "use strict";
        var deferred = $q.defer();
        if (obj.resolve) {
            deferred.resolve([{name: 'Vatsal'}, {name: 'Avni'}]);
        } else {
            deferred.reject();
        }

        spyOn(KidsService, 'getAll').and.returnValue(deferred.promise);
    }

    beforeEach(inject(function ($rootScope, _$compile_, _KidsService_, _$q_) {
        KidsService = _KidsService_;
        $q = _$q_;
        simulateGetKidsPromise({resolve: true});

        scope = $rootScope.$new();
        $compile = _$compile_;
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

