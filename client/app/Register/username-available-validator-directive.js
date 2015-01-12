(function (app) {
    'use strict';
    app.directive('usernameAvailableValidator', function ($q, $timeout, UserService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$asyncValidators.usernameAvailable = function(username) {
                    var defer = $q.defer();
                    UserService.checkUser(username)
                        .then(function(data) {
                            if (data.available) {
                                defer.resolve();
                            } else {
                                defer.reject();
                            }
                        });
                    return defer.promise;
                };
            }
        };
    });
})(angular.module('HousePointsApp'));