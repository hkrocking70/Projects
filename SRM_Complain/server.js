var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'complainbox',
	});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	
app.get('/',function(req,res){
	data = "Welcome to Complain Box...";
	res.json(data);
});

app.get('/srmcomplain',function(req,res){
	var data = {};
	connection.query("SELECT * from complainrecord",function(err, rows, fields){
		if(rows.length != 0){
			data["result"] = rows;
			data["error"] = 0;
			res.json(data);
		}else{
			data["error"] = 1;
			res.json(data);
		}
	});
});

app.post('/srmcomplain',function(req,res){
	var applicant = req.body.applicant;
	var regid = req.body.regid;
	var complain = req.body.complain;
	var appstat = 1;
	var data = {};
	if(applicant && regid && complain) {
		connection.query("INSERT INTO complainrecord VALUES('',?,?,?,?)",[applicant,regid,complain,appstat],function(err, rows, fields){
			if(!!err){
				data["error"] = 1;
				res.json(data);
			}else{
				data["error"] = 0;
				res.json(data);
			}
		});
	}else{
		var data = "Please provide all required data.";
		res.json(data);
	}
});

app.put('/srmcomplain',function(req,res){
	var complainid = req.body.complainid;
	var appstat = req.body.appstat;
	var data = {};
	if(complainid){
		connection.query("UPDATE complainrecord SET appstat=? WHERE complainid=?",[appstat,complainid],function(err, rows, fields){
			if(!!err){
				data["error"] = 1;
			}else{
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data = "Please provide all required data.";
		res.json(data);
	}
});

app.delete('/srmcomplain',function(req,res){
	var complainid = req.body.complainid;
	var data = {};
	if(complainid){
		connection.query("DELETE from complainrecord WHERE complainid=?",[complainid],function(err, rows, fields){
			if(!!err){
				data["error"] = 1;
			}else{
				data["error"] = 0;
			}
			res.json(data);
		});
	}else{
		data = "Please provide all required data.";
		res.json(data);
	}
});

http.listen(8000,function(){
	console.log("Connected & Listen to port 8000");
});