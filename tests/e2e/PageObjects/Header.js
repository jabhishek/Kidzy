Header = function() {
    var header = element(by.tagName('header'));
    this.nav = header.element(by.tagName('nav'));
    this.navbarHeader = header.element(by.css('.navbar-header'));
    this.user = header.element(by.css('.user'));
    this.navToggle = header.element(by.css('.nav-toggle'));
    this.adminTab = this.nav.element(by.css('.admin'));
    this.mainTab = this.nav.element(by.css('.main'));
    this.logoutTab = this.nav.element(by.css('.logout'));
};

module.exports = Header;