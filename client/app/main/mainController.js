(function (app) {
    'use strict';
    app.controller('MainController', MainController);

    function MainController(AuthService) {
        var vm = this;
        vm.Auth = AuthService;

        vm.showAdminView = vm.Auth.hasRole('admin');
        vm.showChildView = vm.Auth.hasRole('child');
        vm.showParentView = vm.Auth.hasRole('parent');
    }
})(angular.module('HousePointsApp'));