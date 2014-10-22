describe("StorageService", function () {
    "use strict";
    var localStorageService, StorageService;
    beforeEach(module('HousePointsApp'));

    beforeEach(inject(function(_StorageService_, _localStorageService_) {
        localStorageService = _localStorageService_;
        StorageService = _StorageService_;
    }));

    describe("getAuthToken", function() {
        it("should exist", function() {
            expect(StorageService.getAuthToken).toBeDefined();
        });

        it("return undefined if cookie not present", function() {
            localStorageService.remove('token');
            expect(StorageService.getAuthToken()).toBe(null);
        });

        it("return undefined if cookie not present", function() {
            localStorageService.set('token', 'someToken');
            expect(StorageService.getAuthToken()).toBe('someToken');
        });
    })

    describe("putAuthToken", function() {
        beforeEach(function() {
            localStorageService.remove('token');
        });

        it("should exist", function() {
            expect(StorageService.putAuthToken).toBeDefined();
        });

        it("create and put value to cookie if not already present", function() {
            spyOn(localStorageService, 'set');
            StorageService.putAuthToken('someOtherToken');
            expect(localStorageService.set).toHaveBeenCalled();
        });

        it("do not overwrite if null passed", function() {
            spyOn(localStorageService, 'set');
            StorageService.putAuthToken(null);
            expect(localStorageService.set).not.toHaveBeenCalled();
        });
    })

    describe("removeAuthToken", function() {
        it("should exist", function() {
            expect(StorageService.removeAuthToken).toBeDefined();
        });

        it("removed from local storage", function() {
            spyOn(localStorageService, 'remove');
            StorageService.removeAuthToken();
            expect(localStorageService.remove).toHaveBeenCalled();
        });
    })
});
