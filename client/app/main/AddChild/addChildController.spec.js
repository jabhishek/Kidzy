describe("addChild", function () {
	"use strict";
	var addChildController, $state, KidsService;
	beforeEach(function () {
		module("HousePointsApp");
		module(function ($provide) {
			$provide.factory('$state', function () {
				return {
					go: function (state) {
						console.log('Transition to state ' + state);
					}
				}
			});
		});
	});
	beforeEach(inject(function ($controller, _$state_, _KidsService_, _$rootScope_) {
		addChildController = $controller('addChildController');
		$state = _$state_;
		KidsService = _KidsService_;

	}));

	it("to be  defined", function () {
		expect(addChildController).toBeDefined();
	})
	it("child property to be  defined", function () {
		expect(addChildController.child).toBeDefined();
		expect(addChildController.child.hasOwnProperty('name')).toBeTruthy();
	})

	describe("submit", function () {
		var $q, $rootScope;
		beforeEach(inject(function(_$q_, _$rootScope_) {
			$q = _$q_;
			$rootScope = _$rootScope_;
		}));

		it("should be defined", function () {
			expect(addChildController.submit).toBeDefined();
		})
		it("should not call KidsService.addKid if form is invalid", function () {
			spyOn(KidsService, "addKid");
			addChildController.submit(false);
			expect(KidsService.addKid).not.toHaveBeenCalled();
		});
		it("should not call KidsService.addKid if no child passed", function () {
			spyOn(KidsService, "addKid");
			addChildController.submit(true);
			expect(KidsService.addKid).not.toHaveBeenCalled();
		});
		it("should call KidsService.addKid if form is valid and child object passed", function () {
			var deferred = $q.defer();
			deferred.resolve();
			spyOn(KidsService, "addKid").and.returnValue(deferred.promise);

			addChildController.submit(true, {});
			expect(KidsService.addKid).toHaveBeenCalled();
		});
		it("should navigate to main if form is valid and child object passed", function () {
			var deferred = $q.defer();
			deferred.resolve();
			spyOn(KidsService, "addKid").and.returnValue(deferred.promise);

			spyOn($state, "go");

			addChildController.submit(true, {});
			$rootScope.$digest();
			expect($state.go).toHaveBeenCalledWith('main');
		});
	})
});
