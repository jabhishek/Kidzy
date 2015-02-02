(function (app) {
	'use strict';
	app.controller('childDetailsController', function(childDetails, $stateParams) {
		var vm = this;
		var childId = $stateParams.childId;

		vm.details = _.find(childDetails, function(child) {
			return child._id === childId;
		});
	});
})(angular.module('HousePointsApp'));
