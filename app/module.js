'use strict';

var app = angular.module('app', ['ngRoute', 'homeModule', 'chatModule']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        // ================== HOME ==================
        $routeProvider.when('/', {
            controller: "homeCtrl",
            templateUrl: 'partials/home.html'
        });


        // ================== CHAT ==================
        $routeProvider.when('/chat', {
            controller: 'chatCtrl',
            templateUrl: 'partials/chat.html'
        });


        // ================== PAGE 404 ==================	
        $routeProvider.otherwise({
            redirectTo: '/page-404',
            templateUrl: 'partials/page404.html'
        });

        // ================= PRETTY URL ==================    
       $locationProvider.html5Mode({
           enabled: true,
           requireBase: false
       });
    }]);
