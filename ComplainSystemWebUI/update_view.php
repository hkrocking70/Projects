<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <div class="container-fluid" ng-controller="putCtrl">
        <form name="putForm" ng-submit="putSubmit()">
            <div class="form-group">
                <label for="complainid">Complain ID</label>
                <input type="text" class="form-control" id="complainid" placeholder="Complain ID" ng-model="user.complainid">
            </div>  
            
            <div class="form-group">
                <label for="appstat">Complain Status</label>
                <select class="form-control" id="appstat" ng-model="user.appstat">
                   <option value="1">Pending</option>
                   <option value="2">In-Staging</option>
                   <option value="3">Resolved</option>
                </select>
            </div>  
            
            <button type="submit" class="btn btn-default" name="action">Submit</button>
        </form>
    </div>
</body>

</html>