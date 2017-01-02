module app {

    class Notes implements ng.IDirective {
        restrict = "E";
        templateUrl = "notes/notes.html";
    }

    angular.module("app").directive("notes", () => new Notes());
}