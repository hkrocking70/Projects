var express = require('express');
var url = require('url');
var router = express.Router();
var multer  = require('multer');
var execSync = require('child_process').execSync;
var Type = require('type-of-is');
var fs = require('fs');
var events = require('events');
var path = require('path');
var getUrl = require("./getUrl");
var query = "";
//var event = new events.EventEmitter();
//var eventListeners = require('events').EventEmitter.listenerCount(event,'connection');

//event.addListener("connection",function(){});

/* GET home page. */
router.get('/', function(request, response, next) {    
    query = getUrl(request.url);
    query = query.query;
    var x = query;
    x = x.split("/");
    //var url_parts = url.parse(request.url, true);
    //query = url_parts.query.folder;
    //console.log(query);
    //console.log("Get: " + query + "\n");
    try {
        var fol = execSync('ls "../main_folder/'+query+'" -p | grep /').toString().trim().split("\n");
    }catch(e) {
        var fol = [""];
    }

    try {
        var fil = execSync('ls "../main_folder/'+query+'" -p | grep -v /').toString().trim().split("\n");
    }catch(e) {
        var fil = [""];
    }

    r = {};
    if (fil[0] != "")
        r["file"] = fil;
    if (fol[0] != "")
        r["folder"] = fol;
    //console.log(r);
    response.render('files', {
        title: "Server Manager",
        data: r,
        bread: x,
        path: query,
        action : "/?folder="+query
    });
});

var upload = multer({ dest: './uploads/'});
router.post('/', upload.single('thumbnail'), function(req, res, next) {
    var method = req.body.method;
    query = getUrl(req.url);
    query = query.query;
    //console.log("Action: " + query + "\n");

    if(method == "createFolder") {
        var data = req.body.newFolderName;
        var loc = "../main_folder/"+query+"/"+data;
        loc = path.normalize(loc);
        try {
            execSync('mkdir "'+loc+'"');
            res.end("Folder Created");
        }
        catch (e) {
            res.end("Error Creating Folder");
        }
    }
    else if(method == "createFile") {
        var data = req.body.newFileName;
        var loc = "../main_folder/"+query+"/"+data;
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
        var loc = "../main_folder/"+query+"/"+data;
        //console.log(data);
        loc = path.normalize(loc);
        try {
            execSync('rm -rf "'+loc+'"');
            res.end("Folder Deleted");
        }
        catch (e) {
            res.end("Error Deleting Folder");
        }
    }
    else if(method == "renFolder") {
        var data1 = req.body.oldFoName;
        var data2 = req.body.newFoName;
        var loc1 = "../main_folder/"+query+"/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+query+"/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        try {
            execSync('mv '+loc1+' '+loc2);
            res.end("Renamed Folder");
        }
        catch (e) {
            res.end("Error Renaming Folder");
        }
    }
    else if(method == "delFile") {
        var data = req.body.fileDelName;
        var loc = "../main_folder/"+query+"/"+data;
        loc = path.normalize(loc);
        try {
            execSync('rm "'+loc+'"');
            res.end("Deleted File");
        }
        catch (e) {
            res.end("Error Deleting File");
        }
    }
    else if(method == "renFile") {
        var data1 = req.body.oldFiName;
        var data2 = req.body.newFiName;
        var loc1 = "../main_folder/"+query+"/"+data1;
        loc1 = '"'+path.normalize(loc1)+'"';
        var loc2 = "../main_folder/"+query+"/"+data2;
        loc2 = '"'+path.normalize(loc2)+'"';
        try {
            execSync('mv '+loc1+' '+loc2);
            res.end("Renamed File");
        }
        catch (e) {
            res.end("Error Renaming File");
        }
    }
    else if(method == "uploadFile") {
        //console.log(req.file);
        var ofilename = req.file.originalname;
        var sloc = '"'+path.normalize(req.file.path)+'"';
        var tloc = '"'+path.normalize("../main_folder/"+query+"/"+req.file.filename)+'"';
        try {
            execSync('mv '+sloc+' '+tloc);
            sloc = '"'+path.normalize("../main_folder/"+query+"/"+req.file.filename)+'"';
            tloc = '"'+path.normalize("../main_folder/"+query+"/"+ofilename)+'"';
            execSync('mv '+sloc+' '+tloc);
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
            var loc = '"'+path.normalize("../main_folder/"+query+"/")+'"';
            execSync('youtube-dl '+youtube + " && chmod 777 '" + name + "' && mv '" + name + "' "+loc);
            res.end("Download Successful");
        }
        catch (e) {
            res.end("Some error occured.");        
        }
        
    }
});

module.exports = router;
