(function (app) {
    'use strict';
    app.controller('adminController', function (AuthService, UserService) {
        var vm = this;
        vm.Auth = AuthService;
        vm.users = {};
        UserService.getAllUsers().then(function(data) {
            console.log(data);
            vm.users = data;
        });
    });
})(angular.module('HousePointsApp'));