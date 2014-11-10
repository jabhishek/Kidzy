(function (app) {
    'use strict';
    app.controller('logController', function (logger) {
        var vm = this;
        vm.logger = logger;
    });
})(angular.module('HousePointsApp'));