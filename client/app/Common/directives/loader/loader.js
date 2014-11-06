(function (app) {
    'use strict';
    app.directive('loader', function ($rootScope, $timeout) {
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
                    console.group('loader - $stateChangeStart');
                    console.log('from ' + fromState.name + ' to ' + toState.name);
                    scope.data.startTime = new Date();
                    console.log('start time');
                    console.log(scope.data.startTime);

                    elem.removeClass('ng-hide');
                    console.groupEnd('$stateChangeStart');

                });
                var unregisterSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                    console.group('loader - $stateChangeSuccess');
                    console.log('from ' + fromState.name + ' to ' + toState.name);
                    var transitionTime = new Date() - scope.data.startTime;
                    console.log('state Transition time: ' + transitionTime + ' ms');

                    var loaderTimeout = minLoaderDisplayTime - transitionTime;
                    loaderTimeout = loaderTimeout > 0 ? loaderTimeout : 0;
                    console.log(loaderTimeout);
                    hideLoaderTimeout = $timeout(function() {
                        elem.addClass('ng-hide');
                    }, loaderTimeout);

                    console.groupEnd('$stateChangeSuccess');
                });

                var unregisterError = $rootScope.$on('$stateChangeError', function () {
                    elem.addClass('ng-hide');
                });

                scope.$on('destroy', function() {
                    console.log('unregistering');
                    unregisterStart();
                    unregisterSuccess();
                    unregisterError();
                    $timeout.cancel(hideLoaderTimeout);
                });
            }
        };
    });
})(angular.module('HousePointsApp'));