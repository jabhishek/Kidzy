(function (app) {
    app.controller('addChildController', function($state) {
        "use strict";
        var vm = this;
        vm.child = {
            name: 'Vatsal'
        };

        vm.submit = function() {
            $state.go('main');
        }
    })
})(angular.module('HousePointsApp'));