describe("KidsService", function () {
    "use strict";
    var kidsService, $httpBackend;
    beforeEach(module('HousePointsApp'));
    beforeEach(inject(function (_KidsService_, _$httpBackend_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('login/login.html', '');
        kidsService = _KidsService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET' , '/api/kids').respond({ err: null, kids: []});
    }));

    it("should be defined", function () {
        expect(kidsService).toBeDefined();
    });

    it("should have getAllForParent method defined", function () {
        expect(kidsService.getAll).toBeDefined();
    });

    it("should get setCachedKids to be defined", function () {
        expect(kidsService.setCachedKids).toBeDefined();
    });

    it("should get getCachedKids to be defined", function () {
        expect(kidsService.setCachedKids).toBeDefined();
    });

    it("should get clearCachedKids to be defined", function () {
        expect(kidsService.setCachedKids).toBeDefined();
    });

    it("setCachedKids should set value to kids", function () {
        kidsService.setCachedKids([]);
        expect(kidsService.getCachedKids()).toEqual([]);
    });

    it("clearCachedKids should set kids to undefined", function () {
        kidsService.setCachedKids([]);
        kidsService.clearCachedKids();
        expect(kidsService.getCachedKids()).toBeUndefined();
    });

    it("should get data from server if local kids not defined", function () {
        $httpBackend.expectGET('/api/kids');
        kidsService.setCachedKids();
        kidsService.getAll();
        $httpBackend.flush();
    });

    it("should get data from cache if local kids defined", function () {
        kidsService.setCachedKids([{ name: 'Abhi'}]);
        kidsService.getAll();
        expect(kidsService.getCachedKids()).toEqual([{ name: 'Abhi'}]);
    });
});
