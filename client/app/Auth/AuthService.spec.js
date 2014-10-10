describe("AuthService", function () {

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, $cookieStore, UserService, $q;
    var correctUser = { email: 'correctEmail@email.com'};
    var incorrectUser = { email: 'wrongEmail@email.com'};
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _$cookieStore_, _UserService_) {
        UserService = _UserService_;
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        $cookieStore = _$cookieStore_;
        $httpBackend.when('POST', '/auth/local', correctUser).respond(200, { token: "someToken"});
        $httpBackend.when('POST', '/auth/local', incorrectUser).respond(404, '');
        $httpBackend.when('GET', '/api/users/me').respond(200, {});
        $httpBackend.flush();
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

        it('should delete token from cookieStore', function () {
            $cookieStore.put('token', "someToken");
            AuthService.logout();
            expect($cookieStore.get('token')).toBe(undefined);
        });

        it('should clear currentUser', function () {
            AuthService.currentUser = { name: ""};
            AuthService.logout();
            expect(AuthService.currentUser.name).toBe(undefined);
        });
    })
});