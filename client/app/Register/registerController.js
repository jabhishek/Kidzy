(function (app) {
    'use strict';
    app.controller('registerController', function () {
        var vm = this;

        vm.user = {};

        init();

        /// Private methods ///

        function init() {
            vm.user = {
                email: '',
                password: ''
            };
            vm.error = undefined;
        }
    });
})(angular.module('HousePointsApp'));