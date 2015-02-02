describe("childDetailsController", function () {
	"use strict";
	var $controller, childDetails, controller;
	beforeEach(module('HousePointsApp'));

	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	it("should be defined", function () {
		childDetails = [{_id: 1, name: 'Vatsal', housePoints: []}];
		controller = $controller('childDetailsController', { childDetails : {name: 'Vatsal', housePoints: [], totalPoints: 0} });
		expect(controller).toBeDefined();
	});
	it("should have details defined and populated", function () {
		childDetails = [{_id: 1, name: 'Vatsal', housePoints: []}, {_id: 2, name: 'Avni', housePoints: []}];
		controller = $controller('childDetailsController', {childDetails: childDetails, $stateParams: { childId: 2 }});
		expect(controller.details).toBeDefined();
		expect(controller.details).toEqual({_id: 2, name: 'Avni', housePoints: []});
	})
});