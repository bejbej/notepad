module app {
    interface IRootScopeService extends ng.IRootScopeService {
        pageSize: string;
    }

    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/notes/:id", { templateUrl: "note/note.html" })
                .when("/notes", <any>{ templateUrl: "notes/notes.html", pageSize: "sm" })
                .when("/", { redirectTo: '/notes' })
                .otherwise({ templateUrl: "404/404.html" });
        }
    }

    angular.module("app").config(Route);

    angular.module("app").run(($rootScope: IRootScopeService) => {
        $rootScope.$on("$routeChangeSuccess", (event, route) => {
            $rootScope.pageSize = route.pageSize;
        });
    });
}