(function (app) {
    'use strict';
    app.controller('registerController', function (UserService, $state) {
        var vm = this;

        vm.user = {};
        vm.submit = submit;

        init();

        /// Private methods ///

        function submit(valid, user) {
            if (!valid) {
                return;
            }
            UserService.createUser(user)
                .then(function () {
                    console.log('user created');
                    $state.go('main');
                }, function(err) {
                    console.log('error creating user');
                });
        }
        function init() {
            vm.user = {
                email: '',
                password: '',
                name: ''
            };
            vm.error = undefined;
        }
    });
})(angular.module('HousePointsApp'));