/*describe('angularjs homepage', function() {
    it('should greet the named user', function() {
        browser.get('http://www.angularjs.org');
        element(by.model('yourName')).sendKeys('Julie');
        var greeting = element(by.binding('yourName'));
        expect(greeting.getText()).toEqual('Hello Julie!');
    });
});*/

describe('homepage', function() {
    var ptor = protractor.getInstance();
    it('should load the home page', function() {
        browser.get("/").then(function () {
            return browser.getLocationAbsUrl();
        }).then(function (url) {
            expect(url).toEqual('/');
        });
    });

    it('should set the correct title on home page', function() {
        browser.get("/").then(function () {
            return browser.getTitle();
        }).then(function (title) {
            expect(title).toEqual('House Points App');
        });
    });

    it('should load home page if navigated to incorrect url', function() {
        browser.get("/incorrect").then(function () {
            return browser.getLocationAbsUrl();
        }).then(function (url) {
            expect(url).toEqual('/');
        });
    });
});

