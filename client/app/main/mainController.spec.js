describe("MainController", function () {

    var appName = 'HousePointsApp';
    var MainCtrl, AuthService, $controller;

    beforeEach(module(appName));

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _AuthService_, _$q_) {
        AuthService = _AuthService_;
        $controller = _$controller_;
    }));

    it('showAdminView should be true if admin logged in', function () {
        AuthService.setCurrentUser({ name: 'test', role: 'admin'});
        MainCtrl = $controller('MainController');
        expect(MainCtrl.showAdminView).toBeTruthy();
        expect(MainCtrl.showParentView).toBeFalsy();
        expect(MainCtrl.showChildView).toBeFalsy();
    });
    it('showChildView should be true if child logged in', function () {
        AuthService.setCurrentUser({ name: 'test', role: 'child'});
        MainCtrl = $controller('MainController');
        expect(MainCtrl.showAdminView).toBeFalsy();
        expect(MainCtrl.showParentView).toBeFalsy();
        expect(MainCtrl.showChildView).toBeTruthy();
    });
    it('showParentView should be true if child logged in', function () {
        AuthService.setCurrentUser({ name: 'test', role: 'parent'});
        MainCtrl = $controller('MainController');
        expect(MainCtrl.showAdminView).toBeFalsy();
        expect(MainCtrl.showChildView).toBeFalsy();
        expect(MainCtrl.showParentView).toBeTruthy();
    });
});

