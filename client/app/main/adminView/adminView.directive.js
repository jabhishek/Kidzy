(function (app) {
    'use strict';
    app.directive('adminView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/adminView/adminView.html',
            controller: function(UserService) {
                var vm = this;
                vm.users = [];

                UserService.getAllUsers().then(function(users) {
                    _.forEach(users, function(user) {
                        vm.users.push(user);
                    });
                });
            },
            controllerAs: 'adminVm'
        };
    });
})(angular.module('HousePointsApp'));