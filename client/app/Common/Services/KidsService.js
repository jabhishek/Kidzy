(function (app, undefined) {
    'use strict';
    app.factory('KidsService', function (Restangular, $q) {

        var kidsUrl = Restangular.all('api/kids');

        var obj = {
            getAll: getAll,
            addKid: addKid
        };
        return obj;

        // private functions
        function addKid(kid) {
            var defer = $q.defer();
            if (!kid || !angular.isObject(kid)) {
                defer.reject("Invalid parameters passed");
            }
            kidsUrl.post(kid).then(function kidsPostResolved(data) {
                defer.resolve(data);
            }, function kidsPostRejected(err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        function getAll() {
            var defer = $q.defer();
            kidsUrl.get('').then(function (data) {
                defer.resolve(data.kids);
            }, function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    });
})(angular.module('HousePointsApp'));
