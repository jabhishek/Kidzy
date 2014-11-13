(function (app) {
    'use strict';
    app.directive('parentView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/parentView.html',
            controller: function(KidsService) {
                var vm = this;
                vm.kids = [];

                KidsService.getAll().then(function(kids) {
                    vm.kids = kids;
                    console.log(vm.kids);
                });
            },
            controllerAs: 'kidsVm'
        };
    });
})(angular.module('HousePointsApp'));