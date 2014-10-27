describe('app', function () {
    var users = require("./config/users");
    var loginPageObject = require("./PageObjects/LoginPage");
    var loginPage = new loginPageObject();
    var mainPageObject = require("./PageObjects/MainPage");
    var mainPage = new mainPageObject();
    var ptor;

    beforeEach(function () {
        "use strict";
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
    });

    beforeEach(function () {
        loginPage.login(users.parent);
    });

    it('should load the home page', function () {
        mainPage.get();
        expect(browser.getLocationAbsUrl()).toBe('/');
    });

    it('should set the correct title on home page', function () {
        mainPage.get();
        expect(mainPage.getTitle()).toBe('House Points App');
    });

    it('should load home page if navigated to incorrect url', function () {
        browser.get("/incorrect");
        expect(browser.getLocationAbsUrl()).toEqual('/notFound');
    });

    it('should load home page if navigated to admin url', function () {
        browser.get("/admin");
        expect(browser.getLocationAbsUrl()).toEqual('/unauthorized');
    });

    describe("admin", function () {
        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.admin);
        });

        it('should load admin page if navigated to admin url', function () {
            browser.get("/admin");
            expect(browser.getLocationAbsUrl()).toEqual('/admin');
        });
    });
});

