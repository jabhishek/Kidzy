(function (app) {
    'use strict';
    app.directive('emailAvailableValidator', function ($q, $timeout, UserService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$asyncValidators.emailAvailable = function(email) {
                    var defer = $q.defer();
                    UserService.checkUser(email)
                        .then(function(data) {
                            logger.logMessage({message: 'isAvailable: ' + data.available, caller: 'emailAvailableValidator'});
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