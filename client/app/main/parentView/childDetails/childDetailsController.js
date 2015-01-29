(function (app) {
	app.controller('childDetailsController', function(childDetails) {
		"use strict";
		var vm = this;
		vm.childDetails = childDetails;
		vm.message = 'Hello World!!'
	})
})(angular.module('HousePointsApp'));
