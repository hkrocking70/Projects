var express = require('express');
var url = require('url');
var router = express.Router();
var session = require('express-session');
var multer  = require('multer');
var execSync = require('child_process').execSync;
var Type = require('type-of-is');
var fs = require('fs');
var events = require('events');
var path = require('path');

var getUrl = require("./getUrl");

var router = express.Router();
var query;
router.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

/* GET users listing. */
router.get('/', function(request, response, next) {
    request.app.locals.sess = request.session;
    //console.log(request.app.locals.sess);
    query = getUrl(request.url);
    query = query.query;
    
    //console.log(request.app.locals.loggedin);
    if (request.app.locals.sess.uname == request.app.locals.username && request.app.locals.sess.pass == request.app.locals.password) {
        request.app.locals.loggedin = 1;
        response.render('index', {
            title: "Server Manager",
            action : "/files/?folder="+query,
            loggedin: request.app.locals.loggedin
        });
        //console.log(sess);
    }
    else {
        response.redirect("/");
        request.app.locals.loggedin = 0;
        //console.log(sess);
    }
});
/*
var upload = multer({ dest: './uploads/'});
router.post('/', upload.single('thumbnail'), function(req, res, next) {
    var method = req.body.method;
    //console.log(req.body);
    //console.log(req.body);

    if(method == "createFolder") {
        var data = req.body.newFolderName;
        var loc = "../main_folder/"+query+"/"+data;
        loc = path.normalize(loc);
        console.log('mkdir "'+loc+'"');
        //res.redirect("/users/?folder="+query);
    }
    else if(method == "createFile") {
        var data = req.body.newFileName;
        var loc = "../main_folder/"+query+"/"+data;
        loc = path.normalize(loc);
        console.log(loc);
        execSync('touch "'+loc+'"');
        res.redirect("/users/?folder="+query);
    }
    else if(method == "delFolder") {
        var data = req.body.folderDelName;
        var loc = "../main_folder/"+query+"/"+data;
        //console.log(data);
        loc = path.normalize(loc);
        execSync('rm -rf "'+loc+'"');
        res.redirect("/users/?folder="+query);
    }
    else if(method == "renFolder") {
        var data1 = req.body.oldFoName;
        var data2 = req.body.newFoName;
        var loc1 = "../main_folder/"+query+"/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+query+"/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        execSync('mv '+loc1+' '+loc2);
        res.redirect("/users/?folder="+query);
    }
    else if(method == "delFile") {
        var data = req.body.fileDelName;
        var loc = "../main_folder/"+query+"/"+data;
        loc = path.normalize(loc);
        execSync('rm "'+loc+'"');
        res.redirect("/users/?folder="+query);
    }
    else if(method == "renFile") {
        var data1 = req.body.oldFiName;
        var data2 = req.body.newFiName;
        var loc1 = "../main_folder/"+query+"/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+query+"/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        execSync('mv '+loc1+' '+loc2);
        res.redirect("/users/?folder="+query);
    }

    else if(method == "uploadFile") {
        //console.log(req.file);
        var ofilename = req.file.originalname;
        var sloc = path.normalize(req.file.path);
        var tloc = '"'+path.normalize("../main_folder/"+query+"/"+ofilename)+'"';
        execSync('mv '+sloc+' '+tloc);
        sloc = '"'+path.normalize( "../main_folder/"+query+"/"+req.file.filename)+'"';
        tloc = path.normalize("../main_folder/"+query+"/"+ofilename);
        execSync('mv '+sloc+' '+tloc);
        res.redirect("/users/?folder="+query);
    }
});*/

module.exports = router;
