(function (app) {
    'use strict';
    app.controller('registerController', function (UserService, $state, AuthService, logger) {
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
                    logger.logMessage({message: 'redirecting to main', caller: 'registerController.submit'});
                    AuthService.login(user).then(function() {
                        $state.go('main');
                    });
                }, function(err) {
                    logger.logMessage({message: 'error creating user', caller: 'registerController.submit'});
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