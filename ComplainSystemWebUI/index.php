<!DOCTYPE html>
<html>

<head>
    <title>SRM Complain System</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.6.2/css/font-awesome.min.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-route.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
</head>

<body>
    <div class="container-fluid" ng-app="index" ng-controller="mainCtrl">
        <div class="row">
            <div class="col-xs-12">
                <button ng-click="viewData()">Show All Complains</button>
                <button ng-click="postData()">Post Data</button>
                <button ng-click="delData()">Delete Data</button>
                <button ng-click="putData()">Update Data</button>
            </div>
            <div class="col-xs-12">
                <ng-view></ng-view>
            </div>
        </div>
    </div>
</body>

</html>