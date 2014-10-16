(function (app) {
    'use strict';
    app.filter('capitalize', function() {
        return function(input) {
            if (!input) {
                return '';
            }
            var firstChar = input.substring(0, 1).toUpperCase();
            return firstChar + input.substring(1);
        };
    });
})(angular.module('HousePointsApp'));