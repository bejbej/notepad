module app {
    angular.module('app').constant('config', appConfig);

    angular.module('app').config($locationProvider => {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
    });
}
