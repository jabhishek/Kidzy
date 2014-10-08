(function (app) {
    'use strict';
    app.controller('mainController', function(UserService) {
        var vm = this;
        vm.message = '';

        UserService.getLoggedInUser().then(function(data) {
           vm.message = 'Hello ' +  data.user.name;
        });
    });
})(angular.module('HousePointsApp'));