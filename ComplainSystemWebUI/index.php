<!DOCTYPE html>
<html>

<head>
    <title>SRM Complain System</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.6.2/css/font-awesome.min.css">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-route.js"></script>
    <script type="text/javascript" src="js/angular.cookies.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script src="js/firebase.js"></script>
    <script src="js/angularfire.min.js"></script>
    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBnAPUy6X78gRO9q7c3mnC2Z2NZBIfb1mA",
            authDomain: "complainsystem-abcc1.firebaseapp.com",
            databaseURL: "https://complainsystem-abcc1.firebaseio.com",
            storageBucket: "complainsystem-abcc1.appspot.com",
        };
        firebase.initializeApp(config);
    </script>
    <script type="text/javascript" src="js/script.js"></script>
</head>

<body>

    <div class="container-fluid no-pad" ng-app="index" ng-controller="mainCtrl">
        <div class="wrapper2" style="display: none;">
            <ng-view></ng-view>
        </div>
        <div class="row wrapper">
            <div class="col-lg-9 mainBg animated slideInLeft" style="background: url('images/complaints.jpg') center center; background-size: cover;">
            </div>
            <div class="col-lg-3 no-pad formWrap animated slideInRight" style="background: #b4c1d4; box-shadow: -2px 0px 5px #CCCCCC;">
                <div class="login">
                    <center>
                        <form ng-submit="submit()" class="form-box">
                            <span class="message" style="font-size: 4vh;"><b>{{ errorLog }}</b></span>
                            <h3>LOGIN</h3>
                            <input type="text" placeholder="Username" name="user" ng-model="user.user" class="form-control">
                            <br>
                            <input type="text" placeholder="Password" name="pass" ng-model="user.pass" class="form-control">
                            <br>
                            <input type="submit" value="Submit" class="btn btn-primary">
                            <button class="sample btn btn-primary">Test Button</button>
                        </form>
                    </center>
                </div>
            </div>
        </div>
    </div>
</body>

</html>