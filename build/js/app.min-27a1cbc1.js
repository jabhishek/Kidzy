!function(){"use strict";angular.module("HousePointsApp",["ui.router","ngCookies","restangular","ngAnimate"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(e,r,o,t){e.state("main",{url:"/",templateUrl:"main/main.html",controller:"mainController as mainVm"}).state("admin",{url:"/admin",templateUrl:"admin/admin.html",controller:"adminController as adminVm"}).state("login",{url:"/login",templateUrl:"login/login.html",controller:"loginController as loginVm"}),r.otherwise("/"),o.html5Mode({enabled:!0,requireBase:!1}),t.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(e,r,o,t){return{request:function(e){return e.headers=e.headers||{},o.get("token")&&(e.headers.Authorization="Bearer "+o.get("token")),e},responseError:function(e){return console.group("response error"),console.log(e),console.groupEnd(),401===e.status?(t.path("/login"),o.remove("token"),r.reject(e)):r.reject(e)}}}])}();
!function(e){"use strict";e.factory("AuthService",["$http","$q","$cookieStore","UserService",function(e,n,o,t){function r(){return l.hasOwnProperty("role")}function u(e){return l&&g.isLoggedIn()?l.role===e:!1}function s(){o.get("token")&&(f=t.getLoggedInUser(),f.then(function(e){l=e.user}))}function c(){l={},o.remove("token")}function i(r){var u=n.defer();return e.post("/auth/local",r).success(function(e){o.put("token",e.token),f=t.getLoggedInUser(),f.then(function(e){l=e.user,console.log("resolved"),u.resolve()},function(e){u.reject(e)})}).error(function(e){o.remove("token"),u.reject(e)}),u.promise}var g,f,l={};return g={login:i,logout:c,getCurrentUser:function(){return l},setCurrentUser:function(e){l=e},isLoggedIn:r,isLoggedInPromise:f,hasRole:u},s(),g}])}(angular.module("HousePointsApp"));
!function(e){"use strict";e.factory("UserService",["Restangular",function(e){function t(){return r.one("me").get()}function n(){return r.getList()}var r=e.all("api/users");return{getLoggedInUser:t,getAllUsers:n}}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.controller("adminController",["AuthService",function(t){var n=this;n.Auth=t}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.controller("mainController",["AuthService",function(t){var n=this;n.Auth=t}])}(angular.module("HousePointsApp"));
!function(o){"use strict";o.controller("loginController",["AuthService","$state",function(o,n){function t(t,r){t&&o.login(r).then(function(){n.go("main")},function(o){u.error=o})}function r(){u.user={email:"",password:""},u.error=void 0,u.Auth.logout()}var u=this;u.user={},u.submit=t,u.Auth=o,r()}])}(angular.module("HousePointsApp"));
!function(t){"use strict";t.directive("ajNavbar",["AuthService","$state",function(t,o){return{restrict:"EA",templateUrl:"NavBar/NavBar.html",controller:function(){var r=this;r.isCollapsed=!0,r.Auth=t,r.logout=function(){r.Auth.logout(),r.isCollapsed=!0,o.go("login")}},controllerAs:"navBarVm"}}])}(angular.module("HousePointsApp"));
!function(t){t.filter("capitalize",function(){"use strict";return function(t){if(!t)return"";var n=t.substring(0,1).toUpperCase();return n+t.substring(1)}})}(angular.module("HousePointsApp"));