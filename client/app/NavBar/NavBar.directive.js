(function (app) {
    'use strict';
    // todo-abhi - show navbar conditionslly
    app.directive('ajNavbar', function (AuthService) {
        return {
            restrict: 'EA',
            templateUrl: 'NavBar/NavBar.html',
            controller: function() {
                var vm = this;
                vm.isCollapsed = true;
                vm.Auth = AuthService;
            },
            controllerAs: 'navBarVm'
        };
    });
})(angular.module('HousePointsApp'));