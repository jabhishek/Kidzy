(function (app) {
    'use strict';
    app.controller('adminController', function (AuthService, UserService, $timeout) {
        var vm = this;
        vm.Auth = AuthService;
        vm.users = [];

        UserService.getAllUsers().then(function(data) {
            data.forEach(function(user) {
                vm.users.push(user);
            })
        });
    });
})(angular.module('HousePointsApp'));