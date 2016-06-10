var app = angular.module("index", ["ngRoute", "ngCookies"]);
var sess;
var cookie;
var domain = "//localhost:8000";
app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main_view.php',
            controller: 'mainViewCtrl'
        });
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
                    method: 'POST',
                    url: domain,
                    data: $scope.user,
                    headers : {'Content-Type': 'application/json'} 
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
        url: domain+'/srmcomplain',
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
            url: domain+'/srmcomplain',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            scopes.get('mainViewCtrl').viewData();
        });
    }

    $scope.range = function(min, max, excludes, includes, step=1) {
        step = step || 1;
        var input = [];
        for (var i=min; i<=max; i+=step){
            if ($.inArray(i, excludes) == -1)
                input.push(i);
        }

        includes.forEach(function(x) {
            input.push(x);
        });
        return input;
    }
});

app.controller('delCtrl', function ($scope, $http, scopes) {
    $scope.user = {};
    scopes.store('delCtrl', $scope);
    $scope.delSubmit = function() {
        $http({
            method: 'POST',
            url: domain+'/srmcomplain/delete',
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
            url: domain+'/srmcomplain/update',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            scopes.get('mainViewCtrl').viewData();
        });
    }
});

app.controller('mainViewCtrl', function ($scope, $http, scopes, $cookies) {
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

    $scope.logout = function() {
        $cookies.remove("loggedin");
        document.location = "#";
        location.reload();
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