var app = require('express')();
var http = require('http').Server(app);

var IpIdMap = {};

app.get('/balls',function(req,res){
	var data = '';
	req.on('data',function(chunk){
		data += chunk;
	});
	req.on('end',function(err){
		console.log(data);
		try {
			data = JSON.parse(data);
			
		} catch(err){
			console.log("JSON ERROR:" + err);
		}
	});
	res.sendStatus(200);
	res.end("test");
});

var port = 80;
http.listen(port,function(){ console.log('listening on port 80');});