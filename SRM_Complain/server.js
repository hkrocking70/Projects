var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'complainBox',
	});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	
app.get('/',function(req,res){
	data = "Welcome to Complain Box...";
	res.json(data);
});

app.get('/srmcomplain',function(req,res){
	var data;
	connection.query("SELECT * from complainRecord",function(err, rows, fields){
		if(rows.length != 0){
			data = rows;
			res.json(data);
		}else{
			data = 'No Complain Found..';
			res.json(data);
		}
	});
});

app.post('/srmcomplain',function(req,res){
	var applicant = req.body.applicant;
	var regid = req.body.regid;
	var complain = req.body.complain;
	var appstat = 1;
	if(applicant && regid && complain) {
		connection.query("INSERT INTO complainRecord VALUES('',?,?,?,?)",[applicant,regid,complain,appstat],function(err, rows, fields){
			if(!!err){
				res.json("Error Occured.");
			}else{
				res.json("No Error Occured.");
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
	if(complainid){
		connection.query("UPDATE complainRecord SET appstat=? WHERE complainid=?",[appstat,complainid],function(err, rows, fields){
			if(!!err){
				data = "Error Updating data";
			}else{
				data = "Updated Status Successfully";
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

	if(complainid){
		connection.query("DELETE from complainRecord WHERE complainid=?",[complainid],function(err, rows, fields){
			if(!!err){
				data = "Error Deleting data";
			}else{
				data = "Deleted.";
			}
			res.json(data);
		});
	}else{
		data = "Please provide all required data.";
		res.json(data);
	}
});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});