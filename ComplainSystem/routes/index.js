var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var router = express.Router();

var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'complainbox',
	});

router.use(cors());

router.get('/',function(req,res){
	res.send("It's Working Fine.");
});

/* GET home page. */
router.get('/srmcomplain',function(req,res){
	var data;
	connection.query("SELECT * from complainrecord",function(err, rows, fields){
		if(rows.length != 0){
			data = rows;
			res.json(data);
		}else{
			data = 'No Complain Found..';
			res.json(data);
		}
	});
});


//Post Request
router.post('/srmcomplain',function(req,res){
	var applicant = req.body.applicant;
	var regid = req.body.regid;
	var complain = req.body.complain;
	var appstat = 1;
	if(applicant && regid && complain) {
		connection.query("INSERT INTO complainrecord VALUES('',?,?,?,?)",[applicant,regid,complain,appstat],function(err, rows, fields){
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


//Update Request
router.post('/srmcomplain/update',function(req,res){
	var complainid = req.body.complainid;
	complainid = parseInt(complainid);
	var appstat = req.body.appstat;
	if(complainid){
		connection.query("UPDATE complainrecord SET appstat=? WHERE complainId=?",[appstat,complainid],function(err, rows, fields){
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

//Delete Request
router.post('/srmcomplain/delete',function(req,res){
	var complainid = req.body.complainid;
	complainid = parseInt(complainid);
	if(complainid){
		connection.query("DELETE from complainrecord WHERE complainId=?",[complainid],function(err, rows, fields){
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

module.exports = router;
