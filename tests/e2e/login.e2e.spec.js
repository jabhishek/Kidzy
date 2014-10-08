/*describe('angularjs homepage', function() {
 it('should greet the named user', function() {
 browser.get('http://www.angularjs.org');
 element(by.model('yourName')).sendKeys('Julie');
 var greeting = element(by.binding('yourName'));
 expect(greeting.getText()).toEqual('Hello Julie!');
 });
 });*/

describe('login', function() {
    var PageObjects= require("./PageObjects/LoginPage");
    var loginPage;

    beforeEach(function() {
        "use strict";
        loginPage = new PageObjects.LoginPage();
    });

    it('should load the login page', function() {
        loginPage.get();
        expect(browser.getLocationAbsUrl()).toBe('/login');
    });

    it('should redirect to main page if login succeeds', function() {
        loginPage.login();
        expect(browser.getLocationAbsUrl()).toBe('/');
    });
});

