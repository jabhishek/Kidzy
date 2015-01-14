(function (app) {
    'use strict';
    app.controller('LoginController', function (AuthService, $state) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;
        vm.Auth = AuthService;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid || !user.username || !user.password) {
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
                password: '',
                username: ''
            };
            vm.error = undefined;
            //vm.Auth.logout();
        }
    });
})(angular.module('HousePointsApp'));