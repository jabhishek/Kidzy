(function (app) {
    app.filter('capitalize', function() {
        "use strict";
        return function(input) {
            if (!input) return "";

            var firstChar = input.substring(0, 1).toUpperCase();
            return firstChar + input.substring(1);
        }
    })
})(angular.module('HousePointsApp'));