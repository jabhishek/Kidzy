(function (app, undefined) {
    'use strict';
    app.factory('KidsService', function (Restangular, $q, localStorageService, configData) {

        var kidsUrl = Restangular.all('api/kids');
		var kidsKey = "kids";
		var kidsDataLifeSpan = configData.kidsDataLifeSpan;
        var obj = {
            getAll: getAll,
            addKid: addKid
        };
        return obj;

        // private functions
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
			var isDataValid = dataFromLocalStorage
				&& dataFromLocalStorage.data
				&& dataFromLocalStorage.creationTime
				&& !isDataExpired;
			if (isDataValid) {
				return dataFromLocalStorage.data;
			}
			return null;
		}

        function getAll() {
            var defer = $q.defer();
			var dataFromLocalStorage = getDataFromLocalStorage();
			if (getDataFromLocalStorage()) {
				defer.resolve(dataFromLocalStorage);
			} else {
				kidsUrl.get('').then(function (data) {
					localStorageService.set(kidsKey, {
						data: data.kids,
						creationTime: new Date()
					});

					defer.resolve(data.kids);
				}, function (err) {
					defer.reject(err);
				});
			}

            return defer.promise;
        }
    });
})(angular.module('HousePointsApp'));
