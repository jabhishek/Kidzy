(function (app) {
    'use strict';
    // todo-abhi - show navbar conditionslly
    app.directive('ajNavbar', function () {
        return {
            restrict: 'EA',
            templateUrl: 'NavBar/NavBar.html',
            controller: function() {
                var vm = this;
                vm.isCollapsed = true;
            },
            controllerAs: 'navBarVm'
        };
    });
})(angular.module('HousePointsApp'));