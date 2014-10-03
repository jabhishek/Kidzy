describe("loginController", function () {

    var appName = 'HousePointsApp';
    var LoginCtrl;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        LoginCtrl = $controller('loginController');
    }));

    it('should have user defined', function () {
        expect(LoginCtrl.user).toBeDefined();
    });
});

