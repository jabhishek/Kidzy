(function (app) {
    'use strict';
    app.controller('adminController', function (AuthService) {
        var vm = this;
        vm.Auth = AuthService;
    });
})(angular.module('HousePointsApp'));