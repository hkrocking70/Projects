<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <div class="container-fluid" ng-controller="postCtrl">
        <form name="postForm" ng-submit="postSubmit()">
            <div class="form-group">
                <label for="applicant">Your Name</label>
                <input type="text" class="form-control" id="applicant" placeholder="Name" ng-model="user.applicant">
            </div>
            
            <div class="form-group">
                <label for="regid">Registration Number</label>
                <input type="text" class="form-control" id="regid" placeholder="Registration Number" ng-model="user.regid">
            </div>
            
            <div class="form-group">
                <label for="complain">Your Complain</label>
                <input type="text" class="form-control" id="complain" placeholder="Complain" ng-model="user.complain">
            </div>
            
            <button type="submit" class="btn btn-default" name="action">Submit</button>
        </form>
    </div>
</body>

</html>