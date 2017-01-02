module app {

    class Spinner implements ng.IDirective {
        restrict = "E";
        templateUrl = "spinner/spinner.html";
    }

    angular.module("app").directive("spinner", () => new Spinner());
}