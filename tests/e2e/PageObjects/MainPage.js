MainPage = function() {
    this.getTitle = function() {
        return browser.getTitle();
    };

    this.get = function() {
        browser.get('/');
    };

    this.adminView = element(by.css('.admin-view'));
    this.parentView = element(by.css('.parent-view'));
    this.childView = element(by.css('.child-view'));
};

module.exports = MainPage;