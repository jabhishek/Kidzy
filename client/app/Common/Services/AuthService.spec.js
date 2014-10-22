describe("AuthService", function () {

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, $cookieStore, UserService, StorageService;
    var correctUser = { email: 'correctEmail@email.com'};
    var incorrectUser = { email: 'wrongEmail@email.com'};
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _StorageService_, _UserService_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('admin/admin.html', '');
        $templateCache.put('login/login.html', '');

        UserService = _UserService_;
        spyOn(UserService, 'getLoggedInUser').and.callThrough();
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        StorageService = _StorageService_;
        $httpBackend.when('POST', '/auth/local', correctUser).respond(200, { token: "someToken"});
        $httpBackend.when('POST', '/auth/local', incorrectUser).respond(404, '');
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: { name: 'test'}});
//        $httpBackend.flush();
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(AuthService).toBeDefined();
    });

    it('should have logout method defined', function () {
        expect(AuthService.login).toBeDefined();
    });

    it('should have login method defined', function () {
        expect(AuthService.logout).toBeDefined();
    });

    it('should have currentUser method defined', function () {
        expect(AuthService.getCurrentUser).toBeDefined();
    });

    it('should have hasRole method defined', function () {
        expect(AuthService.hasRole).toBeDefined();
    });

    describe("login", function() {
        "use strict";

        it('login method should put token in cookieStore if user authenticated', function () {
            spyOn(StorageService, 'putAuthToken');
            AuthService.login(correctUser);
            $httpBackend.flush();
            expect(StorageService.putAuthToken).toHaveBeenCalled();
        });

        it('login method should not put token in cookieStore if user not authenticated', function () {
            spyOn(StorageService, 'putAuthToken');
            AuthService.login(incorrectUser);
            $httpBackend.flush();
            expect(StorageService.putAuthToken).not.toHaveBeenCalled();
        });
    });
    describe("logout", function() {
        "use strict";
        it('should delete token from cookieStore', function () {
            spyOn(StorageService, 'removeAuthToken');
            AuthService.logout();
            expect(StorageService.removeAuthToken).toHaveBeenCalled();
        });

        it('should clear currentUser', function () {
            AuthService.setCurrentUser({ name: ""});
            AuthService.logout();
            expect(AuthService.getCurrentUser().name).toBe(undefined);
        });
    })
});

describe("isLoggedIn", function() {
    "use strict";

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, UserService;
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _UserService_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('admin/admin.html', '');
        $templateCache.put('login/login.html', '');

        UserService = _UserService_;
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: { name: 'test'}});
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return false if currentUser doesnt have role', function () {
        AuthService.setCurrentUser({});
        expect(AuthService.isLoggedIn()).toBe(false);
    });
    it('should return true if currentUser has role', function () {
        AuthService.setCurrentUser({ role: 'admin'});
        expect(AuthService.isLoggedIn()).toBe(true);
    });
});

describe("hasRole", function() {
    "use strict";

    var appName = 'HousePointsApp';
    var AuthService, $httpBackend, UserService;
    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_AuthService_, _$httpBackend_, _UserService_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('admin/admin.html', '');
        $templateCache.put('login/login.html', '');

        UserService = _UserService_;
        AuthService = _AuthService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/api/users/me').respond(200, { user: { name: 'test'}});
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('admin - should return false if currentUser doesnt have role admin', function () {
        AuthService.currentUser = {role: 'parent'};
        expect(AuthService.hasRole('admin')).toBe(false);
    });

    it('admin - should return false if currentUser doesnt have a property role', function () {
        AuthService.currentUser = {};
        expect(AuthService.hasRole('admin')).toBe(false);
    });

    it('admin - should return false if currentUser is undefined', function () {
        AuthService.currentUser = undefined;
        expect(AuthService.hasRole('admin')).toBe(false);
    });
});



