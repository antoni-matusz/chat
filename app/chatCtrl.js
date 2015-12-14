'use strict';

var app = angular.module('chatModule', []);

app.controller('chatCtrl', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

    $scope.message = '';
       	
	if(sessionStorage.length === 0 || sessionStorage.login === undefined || sessionStorage.login === null){
        $location.path('/');
    }else{
        $scope.login = sessionStorage.getItem("login");
    	getChat();
    };

    function getChat(){
    	$http.get('api/chat/getchat/')
    	.success(function (data) {
    		$scope.chat = data; 
            $scope.getColor = sessionStorage.getItem("color");                   
        }).error(function () {
            validInfo('Błąd połączenia z API');
        });
    };

    $scope.addMessage = function(message){
        var color = sessionStorage.color;
        var textValue = $.trim(message);
        var nick_color = '';

        if(color === undefined || color == ''){
            var setColor = Math.floor((Math.random() * 100) + 1);
            if(setColor <= 20){
                nick_color = 'ba68bf';    
            }else if(setColor <= 40){
                nick_color = '27d4aa';
            }else if(setColor <= 60){
                nick_color = '459ddb';
            }else if(setColor <= 80){
                nick_color = '7AE9CD';
            }else{
                nick_color = '99CDF1';    
            }
        }else{
            nick_color = sessionStorage.color;
        }

        if (textValue == '') {
            validInfo('Wiadomość nie może być pusta');
        }else {
            $http.post('api/chat/sendmessage/', {
                    nick: sessionStorage.login,
                    message: textValue,
                    nick_color: nick_color

                }).
                success(function () {
                    sessionStorage.setItem('color', nick_color);
                    $scope.message = '';
                    getChat();
                    $('html, body').animate({
                        scrollTop: $("#textAreaScroll").offset().top
                    }, 1000);
                }).
                error(function () {
                    validInfo('Błąd połączenia z API');
                });
        }
    };

    function validInfo(v) {
        $scope.validInfo = v;
        $timeout(function() {
            $scope.validInfo = false;
        }, 3000);
    };


}]);

app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

