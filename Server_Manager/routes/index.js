var express = require('express');
var session = require('express-session');
var url = require('url');
var router = express.Router();
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
    //console.log(request.app.locals.sess.uname == request.app.locals.username);
    if (request.app.locals.sess.uname == request.app.locals.username && request.app.locals.sess.pass == request.app.locals.password) {
        request.app.locals.loggedin = 1;
        //console.log(sess);
    }
    else {
        request.app.locals.loggedin = 0;
        //console.log(sess);
    }
    response.render('index', {
        title: "Server Manager",
        action: "/",
        loggedin: request.app.locals.loggedin
    });
});

var upload = multer({ dest: './uploads/'});
router.post('/', upload.single('thumbnail'), function(req, res, next) {
    var method = req.body.method;
    //console.log(req.file);

    if(method == "createFolder") {
        var data = req.body.newFolderName;
        var loc = "../main_folder/"+data;
        loc = path.normalize(loc);
        try {
            execSync('mkdir "'+loc+'"');
            res.end("Folder Created");
        }
        catch (e) {
            res.end("Error Creating Folder.");
        }
    }
    else if(method == "createFile") {
        var data = req.body.newFileName;
        var loc = "../main_folder/"+data;
        loc = path.normalize(loc);
        try {
            execSync('touch "'+loc+'"');
            res.end("File Created");
        }
        catch (e) {
            res.end("Error Creating File");
        }
    }
    else if(method == "delFolder") {
        var data = req.body.folderDelName;
        var loc = "../main_folder/"+data;
        //console.log(data);
        loc = path.normalize(loc);
        try {
            execSync('rm -rf "'+loc+'"');
            res.end("Folder Deleted");
        }
        catch (e) {
            res.end("Error creating file");
        }
    }
    else if(method == "renFolder") {
        var data1 = req.body.oldFoName;
        var data2 = req.body.newFoName;
        var loc1 = "../main_folder/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        try {
            execSync('mv '+loc1+' '+loc2);
            res.end("Renamed Folder");
        }
        catch (e) {
            res.end("Error Renaming")
        }
    }
    else if(method == "delFile") {
        var data = req.body.fileDelName;
        var loc = "../main_folder/"+data;
        loc = path.normalize(loc);
        try {
            execSync('rm "'+loc+'"');
            res.end("Deleted File");
        }
        catch (e) {
            res.end("Error deleting file")
        }
    }
    else if(method == "renFile") {
        var data1 = req.body.oldFiName;
        var data2 = req.body.newFiName;
        var loc1 = "../main_folder/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        try {
            execSync('mv '+loc1+' '+loc2);
            res.end("Renamed File");
        }
        catch (e) {
            res.end("Error Renaming");
        }
    }
    else if(method == "uploadFile") {
        //console.log(req.file);
        var ofilename = req.file.originalname;
        var sloc = path.normalize(req.file.path);
        var tloc = path.normalize("../main_folder/"+req.file.filename);
        try {
            execSync('mv '+sloc+' '+tloc);
            sloc = '"'+path.normalize("../main_folder/"+req.file.filename)+'"';
            tloc = '"'+path.normalize("../main_folder/"+ofilename)+'"';
            execSync('mv '+sloc+' '+tloc + "&& chmod -R 600 " + tloc);
            res.end("File Uploaded");
        }
        catch (e) {
            res.end("Error Uploading File");
        }
    }
    else if(method == "youtube") {
        //console.log(req.body.youtubeLink);
        var youtube = req.body.youtubeLink;
        var y = getUrl(youtube);
        try {
            //var name = execSync("youtube-dl --get-title -o '%(title)s.%(ext)s' "+ y.ytd);
            //console.log('youtube-dl '+youtube + " && chmod 777 '" + name + "' && mv '" + name + "' ../main_folder/");
            var name = execSync("youtube-dl --get-filename -o '%(title)s-" + y.ytd + ".%(ext)s' "+ y.ytd).toString();
            name = name.trim();
            var loc = '"'+path.normalize("../main_folder/")+'"';
            execSync('youtube-dl '+youtube + " && chmod -R 600 '" + name + "' && mv '" + name + "' "+loc);
            res.end("Download Successful");
        }
        catch (e) {
            res.end("Some error occured.");        
        }        
    }
    else {
        req.app.locals.sess=req.session;
        req.app.locals.sess.uname=req.body.uname;
        req.app.locals.sess.pass=req.body.pass;
        res.redirect("/");
    }
});

router.get("/logout", function(req, res, next){
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
