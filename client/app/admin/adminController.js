(function (app) {
    'use strict';
    app.controller('AdminController', function (Users) {
        var vm = this;
        vm.users = [];
        if (angular.isArray(Users)) {
            Users.forEach(function(user) {
                vm.users.push(user);
            });
        }
    });
})(angular.module('HousePointsApp'));