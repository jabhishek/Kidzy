describe("CookieService", function () {
    "use strict";
    var $cookieStore, CookieService;
    beforeEach(module('HousePointsApp'));

    beforeEach(inject(function(_$cookieStore_, _CookieService_) {
        $cookieStore = _$cookieStore_;
        CookieService = _CookieService_;
    }));

    describe("getAuthToken", function() {
        it("should exist", function() {
            expect(CookieService.getAuthToken).toBeDefined();
        });

        it("return undefined if cookie not present", function() {
            $cookieStore.remove('token');
            expect(CookieService.getAuthToken()).not.toBeDefined();
        });

        it("return undefined if cookie not present", function() {
            $cookieStore.put('token', 'someToken');
            expect(CookieService.getAuthToken()).toBe('someToken');
        });
    })

    describe("putAuthToken", function() {
        beforeEach(function() {
            $cookieStore.remove('token');
        });

        it("should exist", function() {
            expect(CookieService.putAuthToken).toBeDefined();
        });

        it("create and put value to cookie if not already present", function() {
            CookieService.putAuthToken('someOtherToken');
            expect($cookieStore.get('token')).toBe('someOtherToken');
        });

        it("overwrite value to cookie if already present", function() {
            $cookieStore.put('token', 'someToken');
            CookieService.putAuthToken('someOtherToken');
            expect($cookieStore.get('token')).toBe('someOtherToken');
        });

        it("do not overwrite if undefined passed", function() {
            $cookieStore.put('token', 'someToken');
            CookieService.putAuthToken();
            expect($cookieStore.get('token')).toBe('someToken');
        });

        it("do not overwrite if null passed", function() {
            $cookieStore.put('token', 'someToken');
            CookieService.putAuthToken(null);
            expect($cookieStore.get('token')).toBe('someToken');
        });
    })

    describe("removeAuthToken", function() {
        beforeEach(function() {
            $cookieStore.put('token', 'someToken');
        });

        it("should exist", function() {
            expect(CookieService.removeAuthToken).toBeDefined();
        });

        it("create and put value to cookie if not already present", function() {
            CookieService.removeAuthToken();
            expect($cookieStore.get('token')).not.toBeDefined();
        });
    })
});
