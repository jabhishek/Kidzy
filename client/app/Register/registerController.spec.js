describe("registerController", function () {

    var appName = 'HousePointsApp';
    var RegisterCtrl, UserService, $q, $state, $timeout, AuthService;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _UserService_, _$q_, _$state_, _$timeout_, _$rootScope_, $templateCache, _AuthService_) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('login/login.html', '');
        $rootScope = _$rootScope_;
        UserService = _UserService_;
        AuthService = _AuthService_;
        $q = _$q_;

        $state = _$state_;

        $timeout = _$timeout_;
        RegisterCtrl = $controller('registerController', {UserService: UserService, $state: $state});
    }));

    function simulateCreateUserPromise (obj) {
        "use strict";
        var deferred = $q.defer();
        if (obj.resolve) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        spyOn(UserService, 'createUser').and.returnValue(deferred.promise);
    }

    function simulateLoginPromise (obj) {
        "use strict";
        var deferred = $q.defer();
        if (obj.resolve) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        spyOn(AuthService, 'login').and.returnValue(deferred.promise);
    }

    it('should have user defined', function () {
        expect(RegisterCtrl.user).toBeDefined();
        expect(angular.isObject(RegisterCtrl.user)).toBeTruthy();
    });
    it('user should have property email', function () {
        expect(RegisterCtrl.user.hasOwnProperty('email')).toBeTruthy();
    });
    it('user should have property password', function () {
        expect(RegisterCtrl.user.hasOwnProperty('password')).toBeTruthy();
    });
    it('user should have property name', function () {
        expect(RegisterCtrl.user.hasOwnProperty('name')).toBeTruthy();
    });
    it('should have submit function defined', function () {
        expect(RegisterCtrl.submit).toBeDefined();
        expect(angular.isFunction(RegisterCtrl.submit)).toBeTruthy();
    });

    it('should call UserService.createUser if form is valid', function () {
        simulateCreateUserPromise({resolve: true});
        var user = {email: 'a@a.com'};
        RegisterCtrl.submit(true, user);
        expect(UserService.createUser).toHaveBeenCalledWith(user);
    });

    it('should not call UserService.createUser if form is invalid', function () {
        simulateCreateUserPromise({resolve: true});
        RegisterCtrl.submit(false, {});
        expect(UserService.createUser).not.toHaveBeenCalled();
    });

    it('should login the user once successfully registered', function () {
        simulateCreateUserPromise({resolve: true});
        simulateLoginPromise({resolve: true});

        RegisterCtrl.submit(true, {});
        $rootScope.$digest();
        expect(AuthService.login).toHaveBeenCalled();
    });

    it('should not login the user if registration not successful', function () {
        simulateCreateUserPromise({resolve: false});
        simulateLoginPromise({resolve: true});

        RegisterCtrl.submit(true, {});
        $rootScope.$digest();
        expect(AuthService.login).not.toHaveBeenCalled();
    });

    it('should navigate to main view if successfully registered', function () {
        simulateCreateUserPromise({resolve: true});
        simulateLoginPromise({resolve: true});

        spyOn($state, 'go').and.returnValue($q.defer().promise);

        RegisterCtrl.submit(true, {});
        $rootScope.$digest();
        expect($state.go).toHaveBeenCalled();
    });

    it('should not navigate to main view if not successfully registered', function () {
        simulateCreateUserPromise({resolve: true});
        simulateLoginPromise({resolve: false});

        spyOn($state, 'go').and.returnValue($q.defer().promise);

        RegisterCtrl.submit(false, {});
        $rootScope.$digest();
        expect($state.go).not.toHaveBeenCalled();
    });
});

