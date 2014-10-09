describe("AuthService", function () {

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, $cookieStore, UserService;
    var correctUser = { email: 'correctEmail@email.com'};
    var incorrectUser = { email: 'wrongEmail@email.com'};
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _$cookieStore_, _UserService_) {
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        $cookieStore = _$cookieStore_;
        UserService = _UserService_;
        $httpBackend.when('POST', '/auth/local', correctUser).respond(200, { token: "someToken"});
        $httpBackend.when('POST', '/auth/local', incorrectUser).respond(404, '');

    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(AuthService).toBeDefined();
    });

    describe("login", function() {
        "use strict";

        it('should have login method defined', function () {
            expect(AuthService.login).toBeDefined();
        });

        it('login method should put token in cookieStore if user authenticated', function () {
            $cookieStore.remove('token');
            AuthService.login(correctUser);
            $httpBackend.flush();
            expect($cookieStore.get('token')).toBe("someToken");
        });

        it('login method should not put token in cookieStore if user not authenticated', function () {
            $cookieStore.remove('token');
            AuthService.login(incorrectUser);
            $httpBackend.flush();
            expect($cookieStore.get('token')).toBe(undefined);
        });
    });
    describe("logout", function() {
        "use strict";

        it('should have login method defined', function () {
            expect(AuthService.logout).toBeDefined();
        });

        it('login method should delete token from cookieStore', function () {
            $cookieStore.put('token', "someToken");
            AuthService.logout();
            expect($cookieStore.get('token')).toBe(undefined);
        });
    })
});