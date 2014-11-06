describe("registerController", function () {

    var appName = 'HousePointsApp';
    var RegisterCtrl, UserService, $q, $state, $timeout;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _UserService_, _$q_, _$state_, _$timeout_, _$rootScope_, $templateCache) {
        $templateCache.put('main/main.html', '');
        $templateCache.put('login/login.html', '');
        $rootScope = _$rootScope_;
        UserService = _UserService_;
        $q = _$q_;

        $state = _$state_;

        $timeout = _$timeout_;
        RegisterCtrl = $controller('registerController', {UserService: UserService, $state: $state});
    }));

    beforeEach(function () {
        "use strict";
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(UserService, 'createUser').and.returnValue(deferred.promise);
    });
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
        var user = {email: 'a@a.com'};
        RegisterCtrl.submit(true, user);
        expect(UserService.createUser).toHaveBeenCalledWith(user);
    });

    it('should not call UserService.createUser if form is invalid', function () {
        RegisterCtrl.submit(false, {});
        expect(UserService.createUser).not.toHaveBeenCalled();
    });

    it('should navigate to main view if successfully registered', function () {
        spyOn($state, 'go').and.callThrough();

        RegisterCtrl.submit(true, {});
        $rootScope.$digest();
        expect($state.go).toHaveBeenCalledWith('main');
    });
});

