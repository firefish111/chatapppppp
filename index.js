var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('A user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
io.on('connection', function(socket){
	io.emit('connected');
	socket.on('chat message', function(msg, user){
		io.emit('chat message', msg, user);
		console.log(user + ': ' + msg);
	});
	socket.on('sign in', function(username){
		if ((username.search(' ') == -1) && (username !== "")) {
			io.emit('sign in', username);
		}
	})
});