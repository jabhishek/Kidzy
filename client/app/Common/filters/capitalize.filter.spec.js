describe("capitalize", function () {
    "use strict";
    var $filter;
    beforeEach(module("HousePointsApp"));
    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it("should return Abc if abc passed as parameter", function() {
        expect($filter('capitalize')('abc')).toEqual('Abc');
    });

    it("should return blank if null passed as parameter", function() {
        expect($filter('capitalize')(null)).toEqual('');
    });
});