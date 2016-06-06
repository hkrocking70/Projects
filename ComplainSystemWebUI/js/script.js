var app = angular.module("index", ["ngRoute", "ngCookies"]);
var sess;
var cookie;
app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main_view.php',
            controller: 'mainViewCtrl'
        });
    $httpProvider.defaults.withCredentials = true;
});

app.factory("scopes", function($rootScope) {
    var mem = [];

    return {
        store: function(key, value){
            mem[key] = value;
        },
        get: function(key) {
            return mem[key];
        }
    }
});

app.controller('mainCtrl', function ($scope, $http, scopes, $cookies) {
    scopes.store('mainCtrl', $scope);

    if ($cookies.get("loggedin") === '1') {
        $(".wrapper").hide();
        $(".wrapper2").show();
        window.location.href = "#/main";
    }
    else {
        $scope.submit = function() {
            $http({
                    method: 'GET',
                    url: '//localhost:8000/?user='+$scope.user+'&pass='+$scope.pass,
                })
                .success(function(data){
                    if (data === "Authorized") {
                        $scope.errorLog = "Success";
                        $cookies.put("loggedin", '1');
                        $(".message").removeClass("error");
                        $(".message").addClass("success");
                        $(".mainBg").addClass("slideOutLeft");
                        $(".formWrap").addClass("slideOutRight");
                        $(".mainBg").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).hide();
                            window.location.href = "#/main";
                        });
                        $(".formWrap").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(".wrapper").hide();
                            $(".wrapper2").show();
                        });
                    }
                    else {
                        $(".message").removeClass("success");
                        $(".message").addClass("error");
                        $scope.errorLog = "Unauthorized";
                    }
                });
        }
    }
});

app.controller('viewCtrl', function ($scope, $http, scopes) {
    scopes.store('viewCtrl', $scope);
    $http({
        method: "GET",
        url: '//localhost:8000/srmcomplain',
    })
    .success(function(response){    
        $scope.records = response;
    });
});

app.controller('postCtrl', function ($scope, $http, scopes) {
    $scope.user = {};
    scopes.store('postCtrl', $scope);
    $scope.postSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            scopes.get('mainViewCtrl').viewData();
        });
    }
});

app.controller('delCtrl', function ($scope, $http, scopes) {
    $scope.user = {};
    scopes.store('delCtrl', $scope);
    $scope.delSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain/delete',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            scopes.get('mainViewCtrl').viewData();
        });
    }
});

app.controller('putCtrl', function ($scope, $http, scopes) {
    $scope.user = {};
    scopes.store('putCtrl', $scope);
    $scope.putSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain/update',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            scopes.get('mainViewCtrl').viewData();
        });
    }
});

app.controller('mainViewCtrl', function ($scope, $http, scopes) {
    scopes.store('mainViewCtrl', $scope);
    $scope.viewData = function () {
        $scope.template = "record_view.php";
    }

    $scope.postData = function () {
        $scope.template = "post_view.php";
    }
    
    $scope.delData = function() {
        $scope.template = "delete_view.php";
    }
    
    $scope.putData = function() {
        $scope.template = "update_view.php";
    }
});

/*
$(document).ready(function(){
    $(window).unload(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: '//localhost:8000/srmcomplain/logout',
        });
    });
});*/