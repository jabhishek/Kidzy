describe("loginController", function () {

    var appName = 'HousePointsApp';
    var LoginCtrl, AuthService, $q, $state, $timeout;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _AuthService_, _$q_, _$state_, _$timeout_) {
        AuthService = _AuthService_;
        $q = _$q_;
        $state = _$state_;
        $timeout = _$timeout_;
        LoginCtrl = $controller('loginController');
    }));

    it('should have user defined', function () {
        expect(LoginCtrl.user).toBeDefined();
    });

    it('should call AuthService.login if form is valid', function () {
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(AuthService, 'login').and.returnValue(deferred.promise);
        var valid = true;
        LoginCtrl.submit(valid, {});
        expect(AuthService.login).toHaveBeenCalled();
    });

    it('should not call AuthService.login if form is invalid', function () {
        spyOn(AuthService, 'login');
        var valid = false;
        LoginCtrl.submit(valid, {});
        expect(AuthService.login).not.toHaveBeenCalled();
    });
});

