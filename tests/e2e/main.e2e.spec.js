describe('homepage', function () {
    var users = require("./config/users");
    var loginPageObject = require("./PageObjects/LoginPage");
    var loginPage = new loginPageObject();
    var headerObject = require("./PageObjects/Header");
    var header = new headerObject();
    var mainpageObject = require("./PageObjects/MainPage");
    var mainPage = new mainpageObject();
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

    describe("admin user", function() {
        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.admin);
        });

        it('should load home page', function () {
            expect(browser.getLocationAbsUrl()).toEqual('/');
            expect(mainPage.childView.isPresent()).not.toBe(true);
            expect(mainPage.parentView.isPresent()).not.toBe(true);
        });
    });

    describe("parent user", function() {
        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.parent);
        });

        iit('should have the parent view', function () {
            expect(mainPage.adminView.isPresent()).not.toBe(true);
            expect(mainPage.childView.isPresent()).not.toBe(true);
            expect(mainPage.parentView.isPresent()).toBe(true);
        });
    });

    describe("child user", function() {
        beforeEach(function () {
            "use strict";
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.login(users.child);
        });
        iit('should have the child view', function () {
            expect(mainPage.childView.isPresent()).toBe(true);
            expect(mainPage.adminView.isPresent()).not.toBe(true);
            expect(mainPage.parentView.isPresent()).not.toBe(true);
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

