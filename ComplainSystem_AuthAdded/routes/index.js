var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var url = require('url');
var getHash = require("./getHash");

var router = express.Router();

var authorized = false;

router.use(session({
    secret: 'srm_complain',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'complainbox',
});

var logged;

router.use(cors({
    origin: "http://localhost",
    methods: "GET, PUT, POST",
    credentials: true,
    allowHeaders: "Cache-Control, Pragma, Origin, Content-Type, X-Requested-With"
}));

router.use(cookieParser());

/* Create Session */
router.get('/', function (req, res) {

    req.app.locals.sess = req.session;

    var now = new Date();
    var user = getHash(url.parse(req.url, true).query.user).result;
    var pass = getHash(url.parse(req.url, true).query.pass).result;
    var agent = getHash(req.headers['user-agent']).result;

    connection.query("SELECT * FROM auth WHERE username=? AND password=?", [user, pass], function (err, rows, fields) {
        if (rows.length != 0) {
            res.cookie("loggedin", "1");
            authorized = true;
            res.send("Authorized");
        } else {
            res.cookie("loggedin", "0");
            authorized = false;
            res.send("Unauthorized");
        }
    });
});

/* GET home page. */
router.get('/srmcomplain', function (req, res) {
    var data;
    authorized = false;
    req.app.locals.sess = req.session;
    try {
        if (req.headers.cookie.split("=")[1] == 1) {
            authorized = true;
        }
    }
    catch (e) {
        res.send("Unauthorized User");
    }

    if (authorized)
        connection.query("SELECT * from complainrecord", function (err, rows, fields) {
            if (rows.length != 0) {
                data = rows;
                res.json(data);
            } else {
                data = 'No Complain Found..';
                res.json(data);
            }
        });
    else
        res.send("Unauthorized");
});


//Post Request
router.post('/srmcomplain', function (req, res) {
    authorized = false;
    try {
        if (req.headers.cookie.split("=")[1] == 1) {
            authorized = true;
        }
    }
    catch (e) {
        res.send("Unauthorized User");
    }
    var applicant = req.body.applicant;
    var regid = req.body.regid;
    var complain = req.body.complain;
    var appstat = 1;

    if (authorized)
        if (applicant && regid && complain) {
            connection.query("INSERT INTO complainrecord VALUES('',?,?,?,?)", [applicant, regid, complain, appstat], function (err, rows, fields) {
                if (!!err) {
                    res.json("Error Occured.");
                } else {
                    res.json("No Error Occured.");
                }
            });
        } else {
            var data = "Please provide all required data.";
            res.json(data);
        } else
        res.send("Unauthorized");
});


//Update Request
router.post('/srmcomplain/update', function (req, res) {
    authorized = false;
    try {
        if (req.headers.cookie.split("=")[1] == 1) {
            authorized = true;
        }
    }
    catch (e) {
        res.send("Unauthorized User");
    }
    var complainid = req.body.complainid;
    complainid = parseInt(complainid);
    var appstat = req.body.appstat;

    if (authorized)
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
        } else
        res.send("Unauthorized");
});

//Delete Request
router.post('/srmcomplain/delete', function (req, res) {
    authorized = false;
    try {
        if (req.headers.cookie.split("=")[1] == 1) {
            authorized = true;
        }
    }
    catch (e) {
        res.send("Unauthorized User");
    }
    var complainid = req.body.complainid;
    complainid = parseInt(complainid);

    if (authorized)
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
        } else
        res.send("Unauthorized");
});

// Logout Request
router.get('/srmcomplain/logout', function (req, res) {
    req.app.locals.sess = null;
    req.session.destroy();
    clearCookie('loggedin');
    res.send("/");
});

module.exports = router;