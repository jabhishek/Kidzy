(function (app) {
    'use strict';
    app.controller('MainController', MainController);

    function MainController(AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    }
})(angular.module('HousePointsApp'));