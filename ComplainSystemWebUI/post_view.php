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

            <div class="form-group">
                <label for="venue">Location</label>
                <select class="form-control" ng-model="user.venue" id="venue" placeholder="Venue">
                    <option value="tp">Tech Park</option>
                    <option value="ub">University Building</option>
                    <option value="mc">Main Campus</option>
                </select>
            </div>

            <div class="form-group">
                <label for="roomno">Venue</label>
                <select class="form-control" id="roomno" ng-model="user.roomno" ng-switch on="user.venue">
                   <option ng-repeat="n in range(100,120, excludes=[100, 105, 110], includes=['OS Lab', 'Lab 2', 'Lab 3'])" ng-switch-when="tp" value={{n}}>{{ n }}</option>
                   <option ng-repeat="n in range(1,50, excludes=[2, 5, 10])" ng-switch-when="ub" value={{n}}>{{ n }}</option>
                   <option ng-repeat="n in range(10,50, excludes=[2, 10, 20])" ng-switch-when="mc" value={{n}}>{{ n }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="contact">Contact Number</label>
                <input type="text" class="form-control" id="contact" placeholder="Contact Number" ng-model="user.contact">
            </div>
            
            <button type="submit" class="btn btn-default" name="action">Submit</button>
        </form>
    </div>
</body>

</html>