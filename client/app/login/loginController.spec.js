describe("LoginController", function () {

    var appName = 'HousePointsApp';
    var LoginCtrl, AuthService, $q, $state, $timeout;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _AuthService_, _$q_, _$state_, _$timeout_) {
        AuthService = _AuthService_;
        spyOn(AuthService, 'logout');
        $q = _$q_;
        $state = _$state_;
        $timeout = _$timeout_;
        LoginCtrl = $controller('LoginController');
    }));

    it('should have user defined', function () {
        expect(LoginCtrl.user).toBeDefined();
        expect(LoginCtrl.user.hasOwnProperty('username')).toBeTruthy();
        expect(LoginCtrl.user.hasOwnProperty('password')).toBeTruthy();
    });

    it('should not call AuthService.login if form is invalid', function () {
        spyOn(AuthService, 'login');
        var valid = false;
        LoginCtrl.submit(valid, {});
        expect(AuthService.login).not.toHaveBeenCalled();
    });

    it('should not call AuthService.login if form is valid but user is incorrect', function () {
        var incorrectUser = { };
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(AuthService, 'login').and.returnValue(deferred.promise);
        var valid = true;
        LoginCtrl.submit(valid, incorrectUser);
        expect(AuthService.login).not.toHaveBeenCalled();
    });

    it('should call AuthService.login if form is valid and correct user is passed', function () {
        var correctUser = { username: "username", password: "password"}
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(AuthService, 'login').and.returnValue(deferred.promise);
        var valid = true;
        LoginCtrl.submit(valid, correctUser);
        expect(AuthService.login).toHaveBeenCalled();
    });

});

