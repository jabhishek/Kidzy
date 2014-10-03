describe("AuthService", function () {

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, post;
    var correctUser = { email: 'correctEmail@email.com'};
    var incorrectUser = { email: 'wrongEmail@email.com'};
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_) {
        AuthService = _AuthService_;
        $httpBackend= _$httpBackend_;
        $httpBackend.when('POST', '/auth/local', correctUser).respond(201, { data: []});
        $httpBackend.when('POST', '/auth/local', incorrectUser).respond(404, '');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(AuthService).toBeDefined();
    });

    it('should have login method defined', function () {
        expect(AuthService.login).toBeDefined();
    });

    it('login method should set isLoggedIn to true if user authenticated', function () {
        AuthService.login(correctUser);
        $httpBackend.flush();
        expect(AuthService.isLoggedIn()).toBe(true);
    });

    it('login method should set isLoggedIn to false if user not authenticated', function () {
        AuthService.login(incorrectUser);
        $httpBackend.flush();
        expect(AuthService.isLoggedIn()).toBe(false);
    });
});

