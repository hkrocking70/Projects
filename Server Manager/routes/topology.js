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
    try {
        var fol = execSync('ls -R ../main_folder/ -p | grep  :').toString().trim().split("\n");
    }catch(e) {
        var fol = [""];
    }

    //console.log(fol);
    response.render('topology', {
        data :  fol
    });
});

module.exports = router;
