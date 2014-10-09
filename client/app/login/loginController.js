(function (app) {
    'use strict';
    app.controller('loginController', function (AuthService, $state) {
        var vm = this;
        initForm();
        vm.submit = function (valid, user) {
            if (!valid) {
                return;
            }
            AuthService.login(user)
                .then(function () {
                    $state.go('main');
                });

        };

        function initForm() {
            vm.user = {
                email: '',
                password: ''
            };
            AuthService.logout();
        }
    });
})(angular.module('HousePointsApp'));