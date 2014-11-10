(function (app) {
    'use strict';
    app.directive('loader', function ($rootScope, $timeout, logger) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'Common/directives/loader/loader.html',
            link: function (scope, elem, attrs) {
                var hideLoaderTimeout;
                var minLoaderDisplayTime = attrs.minLoaderDisplay || 300;
                scope.data = {
                    startTime: undefined
                };

                var unregisterStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                    scope.data.startTime = new Date();
                    elem.removeClass('ng-hide');
                });

                var unregisterSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                    logger.logMessage({message: 'from ' + fromState.name + ' to ' + toState.name, caller: 'loader - $stateChangeSuccess'});
                    var transitionTime = new Date() - scope.data.startTime;
                    logger.logMessage({message: 'state Transition time: ' + transitionTime + ' ms', caller: 'loader - $stateChangeSuccess'});

                    var loaderTimeout = minLoaderDisplayTime - transitionTime;
                    loaderTimeout = loaderTimeout > 0 ? loaderTimeout : 0;
                    hideLoaderTimeout = $timeout(function () {
                        elem.addClass('ng-hide');
                    }, loaderTimeout);
                });

                var unregisterError = $rootScope.$on('$stateChangeError', function () {
                    elem.addClass('ng-hide');
                });

                scope.$on('destroy', function () {
                    logger.logMessage({message: 'unregistering', caller: 'loader - destroy'});
                    unregisterStart();
                    unregisterSuccess();
                    unregisterError();
                    $timeout.cancel(hideLoaderTimeout);
                });
            }
        };
    });
})(angular.module('HousePointsApp'));