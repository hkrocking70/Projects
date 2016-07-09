var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var url = require('url');
var getHash = require("./getHash");
var mongoose = require('mongoose');
var firebase = require("firebase");

var router = express.Router();

// Check Authorization status
var authorized = false;

var sess;

//mongoose.connect('mongodb://127.0.0.1:27017/apidb');

var firebase = require("firebase");
firebase.initializeApp({
    serviceAccount: "./ComplainSystem-6dc82f90fab8.json",
    databaseURL: "https://complainsystem-10672.firebaseio.com/"
});

// Session Variables
router.use(session({
    secret: 'srm_complain',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));

// Database Connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'complainbox',
});

// Cross-Site References
router.use(cors({
    origin: "http://localhost",
    methods: "GET, PUT, POST",
    credentials: true,
    allowHeaders: "Cache-Control, Pragma, Origin, Content-Type, X-Requested-With"
}));

router.use(cookieParser());

/* Create Session */
router.get('/', function (req, res) {

    sess = req.session;

    var now = new Date();
    var user = getHash(url.parse(req.url, true).query.user).result;
    var pass = getHash(url.parse(req.url, true).query.pass).result;
    var agent = getHash(req.headers['user-agent']).result;

    connection.query("SELECT * FROM auth WHERE username=? AND password=?", [user, pass], function (err, rows, fields) {
        if (rows.length != 0) {
            cookie = now.getDate()+now.getTime()+"1&&0"+agent;
            res.cookie("userauth", cookie);
            authorized = true;
            res.json("Authorized");
        } else {
            cookie = now.getDate()+now.getTime()+"0&&1"+agent;
            res.cookie("userauth", cookie);
            authorized = false;
            res.json("Unauthorized");
        }
    });
});

/* GET home page. */
router.get('/srmcomplain', function (req, res) {
    var data;
    var idToken = url.parse(req.url, true).query.auth;

    firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
        //var uid = decodedToken.sub;
        connection.query("SELECT * from complainrecord", function (err, rows, fields) {
            if (rows.length != 0) {
                data = rows;
                res.json(data);
            } else {
                data = 'No Complain Found..';
                res.json(data);
            }
        });        
    }).catch(function(error) {
        res.json("Error");
    });
});


//Post Request
router.post('/srmcomplain', function (req, res) {
    authorized = false;
    sess = req.session;
    var idToken = url.parse(req.url, true).query.auth;
    var applicant = req.body.applicant;
    var regid = req.body.regid;
    var complain = req.body.complain;
    var venue = req.body.venue + " - " + req.body.roomno;
    var contact = req.body.contact;
    var appstat = 1;

    firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
        if (applicant && regid && complain) {
            connection.query("INSERT INTO complainrecord VALUES('',?,?,?,?,?,?)", [applicant, regid, complain, venue, contact, appstat], function (err, rows, fields) {
                if (!!err) {
                    res.json('Error Occured.');
                } else {
                    res.json('No Error Occured.');
                }
            });
        } else {
            var data = 'Please provide all required data.';
            res.json(data);
        }         
    }).catch(function(error) {
        res.json("Error");
    });
});


//Update Request
router.post('/srmcomplain/update', function (req, res) {
    authorized = false;
    sess = req.session;
    var idToken = url.parse(req.url, true).query.auth;
    var complainid = req.body.complainid;
    complainid = parseInt(complainid);
    var appstat = req.body.appstat;

    firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
        if (complainid) {
            connection.query("UPDATE complainrecord SET appstat=? WHERE complainId=?", [appstat, complainid], function (err, rows, fields) {
                if (!!err) {
                    data = "Error Updating data";
                } else {
                    data = "Updated Status Successfully";
                }
                res.json(data);
            });
        } else {
            data = "Please provide all required data.";
            res.json(data);
        }        
    }).catch(function(error) {
        console.log(error);
        res.json("Error");
    });
});

//Delete Request
router.post('/srmcomplain/delete', function (req, res) {
    authorized = false;
    sess = req.session;
    var idToken = url.parse(req.url, true).query.auth;    
    var complainid = req.body.complainid;
    complainid = parseInt(complainid);
    firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
        if (complainid) {
            connection.query("DELETE from complainrecord WHERE complainId=?", [complainid], function (err, rows, fields) {
                if (!!err) {
                    data = "Error Deleting data";
                } else {
                    data = "Deleted.";
                }
                res.json(data);
            });
            } else {
                data = "Please provide all required data.";
                res.json(data);
        }       
    }).catch(function(error) {
        res.json("Error");
    });
});

// Logout Request
router.get('/srmcomplain/logout', function (req, res) {
    res.cookie("userauth", null);
    req.session.destroy();
    clearCookie('userauth');
    res.json("/");
});

module.exports = router;