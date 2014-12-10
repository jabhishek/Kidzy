(function (app) {
    'use strict';
    app.controller('LogController', function (logger) {
        var vm = this;
        vm.logger = logger;
    });
})(angular.module('HousePointsApp'));