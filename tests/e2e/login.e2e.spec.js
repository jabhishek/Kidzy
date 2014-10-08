/*describe('angularjs homepage', function() {
 it('should greet the named user', function() {
 browser.get('http://www.angularjs.org');
 element(by.model('yourName')).sendKeys('Julie');
 var greeting = element(by.binding('yourName'));
 expect(greeting.getText()).toEqual('Hello Julie!');
 });
 });*/

describe('login', function() {
    var users = require("./config/users");
    var loginPageObject = require("./PageObjects/LoginPage");
    var loginPage = new loginPageObject();

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
});

