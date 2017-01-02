module app {

    class Pulse implements ng.IDirective {
        restrict = "E";
        templateUrl = "pulse/pulse.html";
    }

    angular.module("app").directive("pulse", () => new Pulse());
}