(function (app) {
    'use strict';
    app.controller('adminController', function (UserService, isAuthenticated, Users) {
        var vm = this;
        vm.users = [];
        Users.forEach(function(user) {
            vm.users.push(user);
        });
    });
})(angular.module('HousePointsApp'));