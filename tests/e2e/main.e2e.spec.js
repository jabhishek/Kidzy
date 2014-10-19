describe('homepage', function () {
    var users = require("./config/users");
    var loginPageObject = require("./PageObjects/LoginPage");
    var loginPage = new loginPageObject();
    var headerObject = require("./PageObjects/Header");
    var header = new headerObject();
    var ptor;

    beforeEach(function () {
        "use strict";
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
    });

    beforeEach(function () {
        loginPage.login(users.parent);
    });

    it('should have a navbar-header', function() {
        expect(header.navbarHeader.isPresent()).toBe(true);
    });

    it('should have user', function() {
        expect(header.user.isPresent()).toBe(true);
    });

    it('should have nav-toggle', function() {
        expect(header.navToggle.isPresent()).toBe(true);
    });

    it('nav-toggle is not displayed', function() {
        expect(header.navToggle.isDisplayed()).toBe(false);
    });

    it('should have nav', function() {
        expect(header.nav.isPresent()).toBe(true);
    });

    it('admin tab is not present', function() {
        expect(header.adminTab.isPresent()).toBe(false);
    });

    it('main tab is present', function() {
        expect(header.mainTab.isPresent()).toBe(true);
    });

    it('logout tab is present', function() {
        expect(header.logoutTab.isPresent()).toBe(true);
    });

    it('should go to login page if logout clicked', function() {
        header.logoutTab.click();
        expect(browser.getLocationAbsUrl()).toBe('/login');
    });

    it('should load home page if navigated to admin url', function () {
        browser.get("/admin");
        expect(browser.getLocationAbsUrl()).toEqual('/');
    });

    describe("admin user", function() {
        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.admin);
        });

        it('admin tab is present', function() {
            expect(header.adminTab.isPresent()).toBe(true);
        });

        it('should go to admin page if admin tab clicked', function() {
            header.adminTab.click();
            expect(browser.getLocationAbsUrl()).toBe('/admin');
        });

        it('should load home page if navigated to admin url', function () {
            browser.get("/admin");
            expect(browser.getLocationAbsUrl()).toEqual('/admin');
        });
    });

    describe("on mobile", function() {
        "use strict";
        beforeEach(function() {
            browser.manage().window().setSize(320, 480);
        });

        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.admin);
        });

        it('nav-toggle is displayed', function() {
            expect(header.navToggle.isDisplayed()).toBe(true);
        });

        it('nav is not displayed', function() {
            expect(header.nav.isDisplayed()).toBe(false);
        });

        it('nav is displayed on nav-toggle click', function() {
            header.navToggle.click();
            expect(header.nav.isDisplayed()).toBe(true);
        });
    })
});

