(function (app) {
    'use strict';
    app.directive('emailAvailableValidator', function ($q, $timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$asyncValidators.emailAvailable = function(username) {
                    var defer = $q.defer();
                    $timeout(function() {
                        defer.resolve();
                    }, 200);
                    return defer.promise;
                };
            }
        };
    });
})(angular.module('HousePointsApp'));