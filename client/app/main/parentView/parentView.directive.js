(function (app) {
    'use strict';
    app.directive('parentView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/parentView/parentView.html',
            controller: function(KidsService) {
                var vm = this;
                vm.kids = [];

                KidsService.getAll().then(function(kids) {
                    _.forEach(kids, function(kid) {
                        vm.kids.push(kid);
                    });
                    console.log(vm.kids);
                });
            },
            controllerAs: 'kidsVm'
        };
    });
})(angular.module('HousePointsApp'));