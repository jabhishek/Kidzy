(function (app) {
    'use strict';
    app.controller('mainController', function(AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    });
})(angular.module('HousePointsApp'));