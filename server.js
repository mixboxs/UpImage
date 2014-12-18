var express = require('express');
var app = express();
var cloudinary = require('cloudinary');
var multer = require('multer');

var collection = null;



app.use(multer({dest: './upload/'}));


app.use(express.static('./'));





// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://root:root@linus.mongohq.com:10065/AppMobile_DB", function(err, db) {
  if(!err) {
    console.log("We are connected");
    collection = db.collection('image');
  }
});



cloudinary.config({ 
  cloud_name: 'dl5rtumye', 
  api_key: '818177582133664', 
  api_secret: 'R3zyIdMJfD7kj2XFIeh2GylJVuw' 
});

app.post('/getImg',function(req,res){
	collection.find().toArray(function(err,result){
		res.send(result);


	});
});







app.post('/upload', function(req, res){



	cloudinary.uploader.upload(req.files.pic.path, function(result) { 

 var img =  {
 		url : result.url
 };

  collection.insert(img,function(err,result){
     
     if (err) {
     	throw err;
     }

     else{
     	res.redirect('./index.html');
     }

  });

  

  });
	
});

app.listen(3000);