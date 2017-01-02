module app {

    class Note implements ng.IDirective {
        restrict = "E";
        scope = {
            id: "="
        };
        templateUrl = "note/note.html";
    }

    angular.module("app").directive("note", () => new Note());
}