(function (app) {
    'use strict';
    app.controller('loginController', function (AuthService, $state) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;
        vm.Auth = AuthService;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid) {
                return;
            }
            AuthService.login(user)
                .then(function () {
                    $state.go('main');
                }, function(err) {
                    vm.error = err;
                });
        }

        function init() {
            vm.user = {
                email: '',
                password: ''
            };
            vm.error = undefined;
            //vm.Auth.logout();
        }
    });
})(angular.module('HousePointsApp'));