<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <div class="container-fluid" ng-controller="delCtrl">
        <form name="delForm" ng-submit="delSubmit()">
            <div class="form-group">
                <label for="complainid">Complain ID</label>
                <input type="text" class="form-control" id="complainid" placeholder="Complain ID" ng-model="user.complainid">
            </div>            
            <button type="submit" class="btn btn-default" name="action">Submit</button>
        </form>
    </div>
</body>

</html>