(function (app) {

    // todo-abhi - show navbar conditionslly
    app.directive('ajNavbar', function () {
        return {
            restrict: "EA",
            //template: "<div class='navbar'>NavBar</div>"
            templateUrl: "NavBar/NavBar.html",
            controller: function() {
                "use strict";
                var vm = this;
                this.isCollapsed = true;
            },
            controllerAs: 'navBarVm'
        }
    });
})(angular.module('HousePointsApp'));


