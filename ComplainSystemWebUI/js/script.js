var app = angular.module("index", ["ngRoute"]);
var sess;
var cookie;
app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/view', {
            templateUrl: 'record_view.php',
            controller: 'viewCtrl'
        })
        .when('/post', {
            templateUrl: 'post_view.php',
            controller: 'postCtrl'
        })
        .when('/delete', {
            templateUrl: 'delete_view.php',
            controller: 'delCtrl'
        })
        .when('/update', {
            templateUrl: 'update_view.php',
            controller: 'putCtrl'
        });
    $httpProvider.defaults.withCredentials = true;
});

app.controller('mainCtrl', function ($scope, $http) {

    $scope.viewData = function () {
        window.location.href = "#/view";
    }

    $scope.postData = function () {
        window.location.href = "#/post";
    }
    
    $scope.delData = function() {
        window.location.href = "#/delete";
    }
    
    $scope.putData = function() {
        window.location.href = "#/update";
    }

    $scope.submit = function() {
        $http({
                method: 'GET',
                url: '//localhost:8000/?user='+$scope.user+'&pass='+$scope.pass,
            })
            .success(function(data){
                if (data === "1") {
                    $(".form-box").empty().hide();
                    $(".options").show();
                }
            });
    }
});

app.controller('viewCtrl', function ($scope, $http) {
    $http({
        method: "GET",
        url: '//localhost:8000/srmcomplain',
    })
    .success(function(response){    
        $scope.records = response;
    });
});

app.controller('postCtrl', function ($scope, $http) {
    $scope.user = {};
    
    $scope.postSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            window.location.href = "#/view";
        });
    }
});

app.controller('delCtrl', function ($scope, $http) {
    $scope.user = {};
    
    $scope.delSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain/delete',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            window.location.href = "#/view";
        });
    }
});

app.controller('putCtrl', function ($scope, $http) {
    $scope.user = {};
    
    $scope.putSubmit = function() {
        $http({
            method: 'POST',
            url: '//localhost:8000/srmcomplain/update',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            window.location.href = "#/view";
        });
    }
});


$(document).ready(function(){
    $(window).unload(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: '//localhost:8000/srmcomplain/logout',
        });
    });
});