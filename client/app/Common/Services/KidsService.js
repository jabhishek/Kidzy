(function (app, undefined) {
    'use strict';
    app.factory('KidsService', function (Restangular, $q, localStorageService, configData, $log) {

        var kidsUrl = Restangular.all('api/kids');
		var kidsKey = 'kids';
		var kidsDataLifeSpan = configData.kidsDataLifeSpan;
        var obj = {
            getAll: getAll,
            addKid: addKid
        };

		init();

        return obj;

        // private functions

		function init() {
			localStorageService.remove(kidsKey);
		}

        function addKid(kid) {
            var defer = $q.defer();
            if (!kid || !angular.isObject(kid)) {
                defer.reject('Invalid parameters passed');
            }
			else {
				kidsUrl.post(kid).then(function kidsPostResolved(data) {
					localStorageService.remove(kidsKey);
					defer.resolve(data);
				}, function kidsPostRejected(err) {
					defer.reject(err);
				});
			}
            return defer.promise;
        }

		function getDataFromLocalStorage() {
			var dataFromLocalStorage = localStorageService.get(kidsKey);
			var isDataExpired = dataFromLocalStorage && dataFromLocalStorage.creationTime ?
					(new Date() - new Date(dataFromLocalStorage.creationTime)) > kidsDataLifeSpan : true;
			var isDataValid = dataFromLocalStorage &&
				dataFromLocalStorage.data &&
				dataFromLocalStorage.creationTime &&
				!isDataExpired;
			if (isDataValid) {
				return dataFromLocalStorage.data;
			}
			return null;
		}

        function getAll() {
            var defer = $q.defer();
			var dataFromLocalStorage = getDataFromLocalStorage();
			if (getDataFromLocalStorage()) {
				$log.info('from cache');
				defer.resolve(dataFromLocalStorage);
			} else {
				$log.info('from server');
				kidsUrl.get('').then(function (data) {
					var kids = transformKids(data.kids);
					localStorageService.set(kidsKey, {
						data: kids,
						creationTime: new Date()
					});

					defer.resolve(data.kids);
				}, function (err) {
					defer.reject(err);
				});
			}

            return defer.promise;
        }

		function transformKids(kids) {
			_.each(kids, function(kid) {
				if (kid.housePoints) {
					kid.totalPoints = _.reduce(kid.housePoints, function (result, hp) {
						return result + hp.points;
					}, 0);
				} else {
					kid.housePoints = [];
					kid.totalPoints = 0;
				}
			});
			return kids;
		}
    });
})(angular.module('HousePointsApp'));
