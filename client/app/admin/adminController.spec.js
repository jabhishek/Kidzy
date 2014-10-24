describe("adminController", function () {

    var appName = 'HousePointsApp';
    var adminCtrl, UserService, $controller;

    beforeEach(module(appName));

    describe("initialization", function () {
        "use strict";

        beforeEach(inject(function (_$controller_, _UserService_) {
            UserService = _UserService_;
            $controller = _$controller_;
            adminCtrl = $controller('adminController', {UserService: UserService, isAuthenticated: {}, Users: [ { name: 'Abhi' }]});
        }));

        it('should have user defined', function () {
            expect(adminCtrl).toBeDefined();
        });

        it('should initialize users', function () {
            expect(adminCtrl.users.length).toBe(1);
        });
    });
});

