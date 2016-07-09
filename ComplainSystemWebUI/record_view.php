<!DOCTYPE html>
<html>

<head>
    
</head>

<body>
    <div class="container-fluid" ng-controller="viewCtrl">       
        <table class="table">
            <thead>
                <th>Complain ID</th>
                <th>Name</th>
                <th>Registration Number</th>
                <th>Complain</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Complain Status</th>
            </thead>
            
            <tbody ng-repeat="record in records">
                <tr>
                    <td>{{ record.complainId }}</td>
                    <td>{{ record.applicant }}</td>
                    <td>{{ record.regid }}</td>
                    <td>{{ record.complain }}</td>
                    <td>{{ record.location }}</td>
                    <td>{{ record.contact }}</td>
                    <td>{{ record.appstat=='1' ? "Pending" : (record.appstat=='2' ? "In-Staging" : "Resolved") }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>