describe("KidsService", function () {
	"use strict";
	var kidsService, $httpBackend, localStorageService, config;
	beforeEach(module('HousePointsApp'));
	beforeEach(inject(function (_KidsService_, _$httpBackend_, $templateCache, _localStorageService_, configData) {
		$templateCache.put('main/main.html', '');
		$templateCache.put('login/login.html', '');
		kidsService = _KidsService_;
		$httpBackend = _$httpBackend_;
		localStorageService = _localStorageService_;
		config = configData;
		localStorageService.remove('kids');
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
		$httpBackend.when('GET', '/api/kids').respond({err: null, kids: [{name: 'Vatsal'}]});
		$httpBackend.expectGET('/api/kids');
		kidsService.getAll();
		$httpBackend.flush();
	});

	it("should return a promise object that resolves an array of kids", function () {
		$httpBackend.when('GET', '/api/kids').respond({err: null, kids: [{name: 'Vatsal'}]});
		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Vatsal', housePoints: [],  totalPoints: 0 }]);
		expect(angular.isArray(response.$$state.value)).toBeTruthy();
	});

	it("should reject the promise if http call returns error", function () {
		$httpBackend.when('GET', '/api/kids').respond(401, {err: "some error"});
		$httpBackend.expectGET('/api/kids');
		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(2);
		expect(response.$$state.value.data).toEqual({err: "some error"});
	});

	it("should put data into localstorage if data retrieved from http call", function () {
		$httpBackend.when('GET', '/api/kids').respond({err: null, kids: [{name: 'Vatsal'}]});
		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Vatsal', housePoints: [], totalPoints: 0 }]);
		expect(localStorageService.get('kids').data).toEqual([{name: 'Vatsal', housePoints: [], totalPoints: 0 }]);
	});

	it("should get data from localstorage if data in localstorage and not expired", function () {
		var baseTime = new Date();
		localStorageService.set('kids', {data: [{name: 'Avni', totalPoints: 0 }], creationTime: baseTime});
		jasmine.clock().install().mockDate(baseTime);
		jasmine.clock().tick(config.kidsDataLifeSpan - 2);

		var response = kidsService.getAll();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Avni', totalPoints: 0 }]);

		jasmine.clock().uninstall();
	});

	it("should get data from server if data in localstorage but expired", function () {
		$httpBackend.when('GET', '/api/kids').respond({
			err: null,
			kids: [{name: 'Avni', housePoints: [{points: 100}]}]
		});
		$httpBackend.expectGET('/api/kids');

		var baseTime = new Date();
		localStorageService.set('kids', {data: [{name: 'Vatsal'}], creationTime: baseTime});
		jasmine.clock().install().mockDate(baseTime);
		jasmine.clock().tick(config.kidsDataLifeSpan + 2);

		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Avni', housePoints: [{points: 100}], totalPoints: 100 }]);
		expect(localStorageService.get('kids').data).toEqual([{name: 'Avni', housePoints: [{points: 100}], totalPoints: 100 }]);

		jasmine.clock().uninstall();
	});

	it("should get data from server if data in localstorage but have no creation time", function () {
		$httpBackend.when('GET', '/api/kids').respond({err: null, kids: [{name: 'Avni'}]});
		$httpBackend.expectGET('/api/kids');

		var baseTime = new Date();
		localStorageService.set('kids', {data: [{name: 'Vatsal'}]});
		jasmine.clock().install().mockDate(baseTime);
		jasmine.clock().tick(11 * 60 * 1000);

		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Avni', housePoints: [], totalPoints: 0 }]);

		expect(localStorageService.get('kids').data).toEqual([{name: 'Avni', housePoints: [], totalPoints: 0 }]);
		jasmine.clock().uninstall();
	});

	it("should get data from server if data in localstorage but have no data", function () {
		$httpBackend.when('GET', '/api/kids').respond({err: null, kids: [{name: 'Avni'}]});
		$httpBackend.expectGET('/api/kids');

		var baseTime = new Date();
		localStorageService.set('kids', {});
		jasmine.clock().install().mockDate(baseTime);
		jasmine.clock().tick(11 * 60 * 1000);

		var response = kidsService.getAll();
		$httpBackend.flush();
		expect(response.$$state.status).toEqual(1);
		expect(response.$$state.value).toEqual([{name: 'Avni', housePoints: [], totalPoints: 0 }]);
		expect(localStorageService.get('kids').data).toEqual([{name: 'Avni', housePoints: [], totalPoints: 0 }]);
		jasmine.clock().uninstall();
	});

	describe("addKid", function () {
		it("addKid should be defined", function () {
			expect(kidsService.addKid).toBeDefined();
		});

		it("addKid should send a post request to /api/kids", function () {
			localStorageService.set('kids', {data: [{name: 'Vatsal'}]});
			$httpBackend.when('POST', '/api/kids').respond({err: null, kids: []});
			$httpBackend.expectPOST('/api/kids');
			var promiseObject = kidsService.addKid({name: 'Vatsal'});
			$httpBackend.flush();
			// expect promise to be resolved (1 = resolved, 2 = rejected))
			expect(promiseObject.$$state.status).toEqual(1);
			expect(localStorageService.get('kids')).toBeNull();
		});

		it("addKid should reject the promise if no kid passed", function () {
			localStorageService.set('kids', {data: [{name: 'Vatsal'}]});
			var promiseObject = kidsService.addKid();
			// expect promise to be rejected
			expect(promiseObject.$$state.status).toEqual(2);
			expect(localStorageService.get('kids').data).toEqual([{name: 'Vatsal'}]);
		});

		it("addKid should reject the promise if kid is not an object", function () {
			localStorageService.set('kids', {data: [{name: 'Vatsal'}]});
			var promiseObject = kidsService.addKid("someName");
			// expect promise to be rejected
			expect(promiseObject.$$state.status).toEqual(2);
			expect(localStorageService.get('kids').data).toEqual([{name: 'Vatsal'}]);
		});
	});
});
