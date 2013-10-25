'use strict';

angular.module('green.inputmaskApp', ["green.inputmask4angular"])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: "MainCtrl"
            })
            .otherwise({
                redirectTo: '/'
            });
    });
