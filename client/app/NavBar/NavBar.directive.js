(function (app) {
    'use strict';
    // todo-abhi - show navbar conditionslly
    app.directive('ajNavbar', function (AuthService, $state) {
        return {
            restrict: 'EA',
            templateUrl: 'NavBar/NavBar.html',
            controller: function() {
                var vm = this;
                vm.isCollapsed = true;
                vm.Auth = AuthService;

                vm.logout = function() {
                    vm.Auth.logout();
                    vm.isCollapsed = true;
                    $state.go('login');
                }
            },
            controllerAs: 'navBarVm'
        };
    });
})(angular.module('HousePointsApp'));