(function (app) {
    'use strict';
    app.controller('adminController', function (AuthService) {
        var vm = this;
        vm.Auth = AuthService;
        console.log(AuthService);
        //vm.message = 'Hello ' + vm.Auth.currentUser.name;
    });
})(angular.module('HousePointsApp'));