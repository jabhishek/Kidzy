(function (app) {
    'use strict';
    app.directive('parentView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/parentView.html'
        };
    });
})(angular.module('HousePointsApp'));