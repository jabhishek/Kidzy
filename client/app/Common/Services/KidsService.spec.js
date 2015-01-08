describe("KidsService", function () {
    "use strict";
    var kidsService, $httpBackend;
    beforeEach(module('HousePointsApp'));
    beforeEach(inject(function (_KidsService_, _$httpBackend_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('login/login.html', '');
        kidsService = _KidsService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", function () {
        expect(kidsService).toBeDefined();
    });

    it("should have getAll method defined", function () {
        expect(kidsService.getAll).toBeDefined();
    });

    it("should do a GET request to api/kids", function () {
        $httpBackend.when('GET' , '/api/kids').respond({ err: null, kids: [ { name: 'Vatsal' }]});
        $httpBackend.expectGET('/api/kids');
        kidsService.getAll();
        $httpBackend.flush();
    });

    it("should return a promise object that resolves an array of kids", function () {
        $httpBackend.when('GET' , '/api/kids').respond({ err: null, kids: [ { name: 'Vatsal' }]});
        var response = kidsService.getAll();
        $httpBackend.flush();
        expect(response.$$state.status).toEqual(1);
        expect(response.$$state.value).toEqual([ { name: 'Vatsal' }]);
        expect(angular.isArray(response.$$state.value)).toBeTruthy();
    });

    describe("addKid", function () {
        it("addKid should be defined", function () {
            expect(kidsService.addKid).toBeDefined();
        });

        it("addKid should send a post request to /api/kids", function () {
            $httpBackend.when('POST' , '/api/kids').respond({ err: null, kids: []});
            $httpBackend.expectPOST('/api/kids');
            var promiseObject = kidsService.addKid({ name: 'Vatsal'});
            $httpBackend.flush();
            // expect promise to be resolved
            expect(promiseObject.$$state.status).toEqual(1);
        });

        it("addKid should reject the promise if no kid passed", function () {
            $httpBackend.when('POST' , '/api/kids').respond({ err: null, kids: []});
            var promiseObject = kidsService.addKid();
            $httpBackend.flush();
            // expect promise to be rejected
            expect(promiseObject.$$state.status).toEqual(2);
        });

        it("addKid should reject the promise if kid is not an object", function () {
            $httpBackend.when('POST' , '/api/kids').respond({ err: null, kids: []});
            var promiseObject = kidsService.addKid("someName");
            $httpBackend.flush();
            // expect promise to be rejected
            expect(promiseObject.$$state.status).toEqual(2);
        });
    });
});
