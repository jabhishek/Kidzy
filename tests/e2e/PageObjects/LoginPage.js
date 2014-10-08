LoginPage = function() {
    this.emailInput = element(by.model('loginVm.user.email'));
    this.passwordInput = element(by.model('loginVm.user.password'));
    this.loginButton = element(by.css('.button'));
    this.emailErrorSpan = element(by.css('.email-error'));
    this.passwordErrorSpan = element(by.css('.password-error'));

    this.get = function() {
        browser.get('/login');
    };

    this.login = function(user) {
        this.get();
        this.emailInput.sendKeys(user.email || '');
        this.passwordInput.sendKeys(user.password  || '');
        this.loginButton.click();
    };
};

module.exports = LoginPage;