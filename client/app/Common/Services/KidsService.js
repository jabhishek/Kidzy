(function (app, undefined) {
    'use strict';
    app.factory('KidsService', function (Restangular, $q) {

        var _kids;
        var kidsUrl = Restangular.all('api/kids');

        var obj = {
            getAll: getAll,
            setCachedKids: setCachedKids,
            clearCachedKids: clearCachedKids,
            getCachedKids: getCachedKids,
            getKidsFromServer: getKidsFromServer
        };
        return obj;

        // private functions
        function clearCachedKids() {
            setCachedKids(undefined);
        }

        function setCachedKids(kids) {
            _kids = kids;
        }

        function getCachedKids() {
            return _kids;
        }

        function getKidsFromServer() {
            return kidsUrl.get('');
        }

        function getAll() {
            var defer = $q.defer();
            if (_kids !== undefined && angular.isArray(_kids)) {
                console.log('getting data from cache');
                defer.resolve(_kids);
            } else {
                // get data from server
                console.log('get data from server');
                _kids = undefined;

                getKidsFromServer().then(function (data) {
                    _kids = data.kids;
                    defer.resolve(data.kids);
                }, function (err) {
                    defer.reject(err);
                });
            }
            return defer.promise;
        }
    });
})(angular.module('HousePointsApp'));
