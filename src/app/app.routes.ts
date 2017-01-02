module app {
    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/notes/:id", { templateUrl: "note/note.html" })
                .when("/notes", { templateUrl: "notes/notes.html" })
                .otherwise({ templateUrl: "404/404.html" });
        }
    }

    angular.module("app").config(Route);
}