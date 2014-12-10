(function (app) {
    'use strict';
    app.controller('RegisterController', function (UserService, $state, AuthService, logger) {
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
                    logger.logMessage({message: 'redirecting to main', caller: 'RegisterController.submit'});
                    AuthService.login(user).then(function() {
                        $state.go('main');
                    });
                }, function() {
                    logger.logMessage({message: 'error creating user', caller: 'RegisterController.submit'});
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