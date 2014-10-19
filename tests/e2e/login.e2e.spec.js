describe('login', function() {
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

    it('should load the login page', function() {
        loginPage.get();
        expect(browser.getLocationAbsUrl()).toBe('/login');
    });

    it('should redirect to main page if login succeeds', function() {
        loginPage.login(users.parent);
        expect(browser.getLocationAbsUrl()).toBe('/');
    });

    it('should show error if empty user passed', function() {
        loginPage.login({});
        expect(loginPage.emailErrorSpan.isPresent()).toBe(true);
        expect(loginPage.passwordErrorSpan.isPresent()).toBe(true);
    });

    it('should show email error if no email passed', function() {
        loginPage.login({email: '', password: 'hjhjkhkj'});
        expect(loginPage.emailErrorSpan.isPresent()).toBe(true);
        expect(loginPage.passwordErrorSpan.isPresent()).toBe(false);
    });

    it('should show email error if invalid email passed', function() {
        loginPage.login({email: 'wrongEmail', password: 'hjhjkhkj'});
        expect(loginPage.emailErrorSpan.isPresent()).toBe(true);
        expect(loginPage.passwordErrorSpan.isPresent()).toBe(false);
    });

    it('should show password error if no password passed', function() {
        loginPage.login({email: 'wrongEmail@abc.com', password: ''});
        expect(loginPage.emailErrorSpan.isPresent()).toBe(false);
        expect(loginPage.passwordErrorSpan.isPresent()).toBe(true);
    });

    describe("", function() {
        "use strict";
        beforeEach(function () {
            "use strict";
            ptor = protractor.getInstance();
            ptor.manage().deleteAllCookies();
        });

        beforeEach(function () {
            loginPage.get();
        });

        it('should have a navbar-header', function() {
            expect(header.navbarHeader.isPresent()).toBe(true);
        });

        it('should not have nav', function() {
            expect(header.nav.isPresent()).toBe(false);
        });

        it('should not have user', function() {
            expect(header.user.isPresent()).toBe(false);
        });

        it('should not have nav-toggle', function() {
            expect(header.navToggle.isPresent()).toBe(false);
        });
    })
});

