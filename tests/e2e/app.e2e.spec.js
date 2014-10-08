/*describe('angularjs homepage', function() {
 it('should greet the named user', function() {
 browser.get('http://www.angularjs.org');
 element(by.model('yourName')).sendKeys('Julie');
 var greeting = element(by.binding('yourName'));
 expect(greeting.getText()).toEqual('Hello Julie!');
 });
 });*/

describe('homepage', function () {
    var users = require("./config/users");
    var loginPageObject = require("./PageObjects/LoginPage");
    var loginPage = new loginPageObject();

    var mainPageObject = require("./PageObjects/MainPage");
    var mainPage = new mainPageObject();

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
        expect(browser.getLocationAbsUrl()).toEqual('/');
    });
});

