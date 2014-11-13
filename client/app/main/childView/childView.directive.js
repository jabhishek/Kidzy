(function (app) {
    'use strict';
    app.directive('childView', function () {
        return {
            restrict: 'E',
            templateUrl: 'main/childView/childView.html'
        };
    });
})(angular.module('HousePointsApp'));