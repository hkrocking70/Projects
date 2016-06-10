<div class="row no-pad" ng-controller="mainViewCtrl">
    <div class="col-lg-2 animated slideInLeft no-pad" style="background: #b4c1d4; box-shadow: 2px 0px 5px #CCCCCC; padding: 0px 5px 0px 5px; box-sizing: border-box;">
        <div class="options">
            <button ng-click="viewData()" class="col-xs-12 btn btn-primary no-pad">Show All Complains</button>
            <button ng-click="postData()" class="col-xs-12 btn btn-primary no-pad">Post Data</button>
            <button ng-click="delData()" class="col-xs-12 btn btn-primary no-pad">Delete Data</button>
            <button ng-click="putData()" class="col-xs-12 btn btn-primary no-pad">Update Data</button>
        </div>
    </div>
    <div class="col-lg-10 animated slideInRight" style="overflow-y: auto;">
        <div ng-include="template"></div>
    </div>
</div>