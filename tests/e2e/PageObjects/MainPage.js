MainPage = function() {
    this.getTitle = function() {
        return browser.getTitle();
    };

    this.get = function() {
        browser.get('/');
    };
};

module.exports = MainPage;