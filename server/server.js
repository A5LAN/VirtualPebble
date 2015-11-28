var app = require('express')();
var http = require('http').Server(app);

var IpIdMap = {};

app.post('/data',function(req,res){
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
});

var port = 80;
http.listen(port,function(){ console.log('listening on port 80');});