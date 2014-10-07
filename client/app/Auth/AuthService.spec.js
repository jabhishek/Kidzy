describe("AuthService", function () {

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, $cookieStore;
    var correctUser = { email: 'correctEmail@email.com'};
    var incorrectUser = { email: 'wrongEmail@email.com'};
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _$cookieStore_) {
        AuthService = _AuthService_;
        $httpBackend= _$httpBackend_;
        $cookieStore = _$cookieStore_;
        $httpBackend.when('POST', '/auth/local', correctUser).respond(200, { token: "someToken"});
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

    it('login method should put token in cookieStore if user authenticated', function () {
        $cookieStore.remove('token');
        AuthService.login(correctUser);
        $httpBackend.flush();
        expect($cookieStore.get('token')).toBe("someToken");
    });

    it('login method should put token in cookieStore if user authenticated', function () {
        $cookieStore.remove('token');
        AuthService.login(incorrectUser);
        $httpBackend.flush();
        expect($cookieStore.get('token')).toBe(undefined);
    });
});

