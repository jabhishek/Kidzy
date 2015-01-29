(function (app) {
	'use strict';
    app.controller('addChildController', function($state, $log, KidsService) {
        var vm = this;
        vm.child = {
            name: ''
        };


        vm.submit = function(isFormValid, child) {
            $log.info(child);
            $log.info(isFormValid);
            if (isFormValid && child) {
                KidsService.addKid(child).then(function() {
                    $state.go('main');
                });
            }
        };
    });
})(angular.module('HousePointsApp'));