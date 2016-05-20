var app = angular.module("index", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
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
});

app.controller('mainCtrl', function ($scope) {
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
});

app.controller('viewCtrl', function ($scope, $http) {
    $http.get('//complain.itshimanshu.me/srmcomplain')
        .success(function (response) {
            $scope.records = response;
        });
});

app.controller('postCtrl', function ($scope, $http) {
    $scope.user = {};
    
    $scope.postSubmit = function() {
        $http({
            method: 'POST',
            url: '//complain.itshimanshu.me/srmcomplain',
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
            url: '//complain.itshimanshu.me/srmcomplain/delete',
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
            url: '//complain.itshimanshu.me/srmcomplain/update',
            data: $scope.user,
            headers : {'Content-Type': 'application/json'} 
        })
        .success(function(data){
            window.location.href = "#/view";
        });
    }
});