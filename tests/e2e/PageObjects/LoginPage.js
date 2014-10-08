var PageObjects = PageObjects || {};
PageObjects.LoginPage = function() {
    this.emailInput = element(by.model('loginVm.user.email'));
    this.passwordInput = element(by.model('loginVm.user.password'));
    this.loginButton = element(by.css('.button'));

    this.get = function() {
        browser.get('/login');
    };

    this.login = function() {
        this.get();
        this.emailInput.sendKeys('test@test.com');
        this.passwordInput.sendKeys('test');
        this.loginButton.click();
    };
};

module.exports = PageObjects;