(function (app) {
    'use strict';
    app.directive('ajUser', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              user: '='
            },
            templateUrl: 'admin/user.html'
        };
    });
})(angular.module('HousePointsApp'));