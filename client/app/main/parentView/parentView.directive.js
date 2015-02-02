(function (app) {
    'use strict';
    app.directive('parentView', function ($state, $log) {
        return {
            restrict: 'E',
            templateUrl: 'main/parentView/parentView.html',
            controller: function(KidsService) {
                var vm = this;
                //vm.kids = [{name: 'Vatsal', totalPoints: 150}];
                vm.kids = [];
                vm.viewDetails = function(kid) {
                    $state.go('kids.display', {'childId': kid.data._id});
                };

                KidsService.getAll().then(function(kids) {
                    _.forEach(kids, function(kid) {
						/*kid.totalPoints = _.reduce(kid.housePoints, function(result, hp) {
							return result + hp.points;
						}, 0);*/
						$log.info(kid);
                        vm.kids.push(kid);
                    });
                });
            },
            controllerAs: 'kidsVm'
        };
    });
})(angular.module('HousePointsApp'));