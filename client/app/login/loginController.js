(function (app) {
    'use strict';
    app.controller('loginController', function (AuthService, $state) {
        var vm = this;
        initForm();
        vm.submit = function (valid, user) {
            if (!valid) {
                return;
            }
            console.log(valid);
            console.log(user);
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
        }
    });
})(angular.module('HousePointsApp'));