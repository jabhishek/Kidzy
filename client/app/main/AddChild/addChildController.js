(function (app) {
    app.controller('addChildController', function($state, $log, KidsService) {
        "use strict";
        var vm = this;
        vm.child = {
            name: 'Vatsal'
        };

        vm.submit = function(isFormValid, child) {
            $log.info(child);
            $log.info(isFormValid);
            if (isFormValid && child) {
                KidsService.addKid(child).then(function() {
                    $state.go('main');
                });
            }
        }
    })
})(angular.module('HousePointsApp'));