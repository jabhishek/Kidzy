describe("adminController", function () {

    var appName = 'HousePointsApp';
    var adminCtrl, UserService, $controller;

    beforeEach(module(appName));

    describe("initialization", function () {
        "use strict";

        beforeEach(inject(function (_$controller_, _UserService_) {
            UserService = _UserService_;
            $controller = _$controller_;

        }));

        it('should have user defined', function () {
            adminCtrl = $controller('adminController', {Users: [ { name: 'Abhi' }]});
            expect(adminCtrl).toBeDefined();
        });

        it('should initialize users', function () {
            adminCtrl = $controller('adminController', {Users: [ { name: 'Abhi' }]});
            expect(adminCtrl.users.length).toBe(1);
        });

        it('should not populate users if injected Users is not an array', function () {
            adminCtrl = $controller('adminController', {Users: {}});
            expect(adminCtrl.users.length).toBe(0);
        });
    });
});

