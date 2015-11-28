var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = require('./lib/sockets');
var IpIdMap = {};
app.use(express.static(process.cwd() + "/static"));
app.post('/data',function(req,res){
	var data = '';
	req.on('data',function(chunk){
		data += chunk;
	});
	req.on('end',function(err){
		console.log(data);
		try {
			data = JSON.parse(data);
			sockets.send("::ffff:129.100.133.128",data,"test");
		} catch(err){
			console.log("JSON ERROR:" + err);
		}
	});
	res.sendStatus(200);
	res.end("test");

});

io.on('connection',function(socket){
	socket.on('disconnect', function(){
    	sockets.remove(sockets.extractSessionId(socket))
  	});
  	socket.emit("identify",sockets.extractSessionId(socket));
  	sockets.save(socket);
  	socket.on('couple',function(destIp){
  		sockets.addViewer(sockets.extractSessionId(this),destIp);
  	});
});

var port = 80;
http.listen(port,function(){ console.log('listening on port 80');});