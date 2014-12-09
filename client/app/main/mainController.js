(function (app) {
    'use strict';
    app.controller('mainController', mainController);

    function mainController(AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    }
})(angular.module('HousePointsApp'));