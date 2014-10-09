(function (app) {
    'use strict';
    app.controller('loginController', function (AuthService, $state) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid) {
                return;
            }
            AuthService.login(user)
                .then(function () {
                    $state.go('main');
                });
        }

        function init() {
            vm.user = {
                email: '',
                password: ''
            };
            AuthService.logout();
        }
    });
})(angular.module('HousePointsApp'));