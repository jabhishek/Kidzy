angular.module("HousePointsApp").run(["$templateCache",function(r){r.put("404.html",'<div class="not-found-page">\r\n    <h1>Page not found</h1>\r\n    <i class="fa fa-lg fa-warning"></i>The page you are looking for has either moved or doesn\'t exist.\r\n</div>'),r.put("Unauthorized.html",'<div class="unauthorized-page">\r\n    <h1>Unauthorized Access</h1>\r\n    <i class="fa fa-warning"></i>Unfortunately, you are not authorized to access this page.\r\n</div>'),r.put("Register/register.html",'<section class="register-section">\r\n    <form class="form register-form" id="registerform" name="registerform" novalidate ng-submit="registerVm.submit(registerform.$valid, registerVm.user)">\r\n        <h2>Register</h2>\r\n        <fieldset>\r\n            <span class="error-message" ng-if="registerVm.error">{{registerVm.error.message}}</span>\r\n            <div class="field">\r\n                <input type="email" id="email" name="email" placeholder="Email" ng-model="registerVm.user.email" ng-model-options="{ debounce: 200 }"\r\n                       required\r\n                       maxlength="50"\r\n                       email-available-validator=""/>\r\n                <i ng-if="registerform.email.$pending" class="fa fa-spin fa-spinner"></i>\r\n                <i class="fa fa-close invalid"></i>\r\n                <i class="fa fa-check valid"></i>\r\n                <span class="error-message email-error" ng-if="registerform.$submitted && (registerform.email.$error.required || registerform.email.$error.email)">Please enter a valid email address.</span>\r\n                <span class="error-message email-error" ng-if="registerform.$submitted && (registerform.email.$error.emailAvailable)">The email address is already registered.</span>\r\n            </div>\r\n            <div class="field">\r\n                <input type="text" id="name" name="name" placeholder="Name" required maxlength="50" ng-model="registerVm.user.name"/>\r\n                <span class="error-message name-error" ng-if="registerform.$submitted && registerform.name.$error.required">Please enter a name.</span>\r\n            </div>\r\n            <div class="field">\r\n                <input type="password" id="password" name="password" placeholder="Password" required maxlength="50" ng-model="registerVm.user.password"/>\r\n                <span class="error-message password-error" ng-if="registerform.$submitted && registerform.password.$error.required">Please enter a password.</span>\r\n            </div>\r\n            <div class="field">\r\n                <input type="password" id="passwordRepeat" name="passwordRepeat" placeholder="Confirm Password" required maxlength="50" ng-model="registerVm.user.passwordRepeat"/>\r\n                <span class="error-message password-error" ng-if="registerform.$submitted && registerform.passwordRepeat.$error.required">Please confirm the password.</span>\r\n                <span class="error-message password-error" ng-if="registerform.$submitted && registerform.passwordRepeat.$valid && registerVm.user.passwordRepeat !== registerVm.user.password">Password doesn\'t match.</span>\r\n            </div>\r\n            <input type="submit" class="button"/>\r\n        </fieldset>\r\n    </form>\r\n</section>'),r.put("login/login.html",'<section class="login-section">\r\n    <form class="form login-form" id="loginform" name="loginform" novalidate ng-submit="loginVm.submit(loginform.$valid, loginVm.user)">\r\n        <h2>Login</h2>\r\n        <fieldset>\r\n            <span class="error-message" ng-if="loginVm.error">{{loginVm.error.message}}</span>\r\n            <div class="field">\r\n                <input type="email" id="email" name="email" placeholder="Email" required maxlength="50" ng-model="loginVm.user.email"/>\r\n                <span class="error-message email-error" ng-if="loginform.$submitted && loginform.email.$invalid">Please enter a valid email address.</span>\r\n            </div>\r\n            <div class="field">\r\n                <input type="password" id="password" name="password" placeholder="Password" required maxlength="50" ng-model="loginVm.user.password"/>\r\n                <span class="error-message password-error" ng-if="loginform.$submitted && loginform.password.$error.required">Please enter a password.</span>\r\n            </div>\r\n            <input type="submit" class="button"/>\r\n        </fieldset>\r\n    </form>\r\n    <div class="register"> or <a ui-sref="register">Sign up</a> if you are a new user</div>\r\n</section>'),r.put("admin/admin.html",'<h2>Admin</h2>\r\n\r\n{{ adminVm.users.length }} users retrieved!!\r\n<div class="usersList">\r\n    <ul>\r\n        <li class="user-animate" data-ng-repeat="user in adminVm.users track by $index">\r\n            <aj-user user="user"></aj-user>\r\n        </li>\r\n    </ul>\r\n</div>\r\n\r\n'),r.put("admin/user.html",'<div class="user-row">\r\n    <div class="left">\r\n        <span>{{ user.name | capitalize }}</span>\r\n        <span>{{ user.email }}</span>\r\n    </div>\r\n    <div class="right">\r\n        <span>{{ user.role | capitalize}}</span>\r\n    </div>\r\n    <div class="actions">\r\n        <i class="fa fa-trash" title="delete"></i>\r\n    </div>\r\n</div>'),r.put("main/main.html",'<h2>Main</h2>\r\n<div>{{ ::\'Hello \' + mainVm.Auth.getCurrentUser().name }}</div>\r\n\r\n<div ng-if="mainVm.Auth.hasRole(\'parent\')" class="parent">\r\n    <span>Parent</span>\r\n</div>\r\n<div ng-if="mainVm.Auth.hasRole(\'child\')" class="child">\r\n    <span>child</span>\r\n</div>'),r.put("Common/NavBar/NavBar.html",'<header class="navbar flex">\r\n    <div class="container">\r\n        <div class="navbar-header clearfix">\r\n            <h1 class="left">Kidzy</h1>\r\n            <div class="right" ng-if="navBarVm.Auth.isLoggedIn()">\r\n                <span class="user">{{ ::navBarVm.Auth.getCurrentUser().name}}</span>\r\n            <span class="nav-toggle visible-mobile" ng-click="navBarVm.isCollapsed = !navBarVm.isCollapsed">\r\n                 <i class="fa fa-lg fa-bars"></i>\r\n            </span>\r\n            </div>\r\n        </div>\r\n        <nav ng-class="{ \'collapsed\': navBarVm.isCollapsed}"  ng-if="navBarVm.Auth.isLoggedIn()">\r\n            <ul class="items">\r\n                <li class="main">\r\n                    <a ui-sref="main" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true">Main</a>\r\n                </li>\r\n                <li class="admin" ng-if="navBarVm.Auth.hasRole(\'admin\')">\r\n                    <a ui-sref="admin" ui-sref-active="active" ng-click="navBarVm.isCollapsed = true">Admin</a>\r\n                </li>\r\n                <li class="logout">\r\n                    <a href="#" ng-click="navBarVm.logout()">Logout</a>\r\n                </li>\r\n            </ul>\r\n        </nav>\r\n\r\n    </div>\r\n</header>'),r.put("Common/directives/loader/loader.html","<div class=\"loading-container\" min-loader-display=\"300\">\r\n    <div class='loader'>\r\n        <div class='circle loaderBall'></div>\r\n        <div class='circle loaderBall1'></div>\r\n        <div class='circle loaderBall2'></div>\r\n        <div class='circle loaderBall3'></div>\r\n        <div class='circle loaderBall4'></div>\r\n        <div class='circle loaderBall5'></div>\r\n        <div class='circle loaderBall6'></div>\r\n    </div>\r\n</div>")}]);