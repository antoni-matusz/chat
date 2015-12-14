'use strict';

var app = angular.module('homeModule', []);

app.controller('homeCtrl', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {

    $scope.login = '';

    if (sessionStorage.length > 0 && sessionStorage.login !== undefined) {
        $location.path('/chat');
    };

    $scope.startChat = function(login) {
        var textValue = $.trim(login);
        if (textValue == '') {
            validInfo('Login użytkownika nie może zaczynać się od SPACJI');
        } else if (textValue.length > 20) {
            validInfo('Login użytkownika nie może dłuższy niż 20 znaków');
        } else {
            sessionStorage.setItem('login', login);
            $location.path('/chat');
        }
    };

    function validInfo(v) {
        $scope.validInfo = v;
        $timeout(function() {
            $scope.validInfo = false;
        }, 3000);
    };


}]);