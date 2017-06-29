var http = require('http');
var express = require('express');
var io = require('socket.io');

var app = express();
var router = express.Router();

app.use(express.static('static'));

var obj = {
	name: 'mani',
	last: 'nilchiani',
	feeling: 'fine'
};

router.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(obj));
});

app.use(router);

app.listen(3000, function() {
	console.log('App serving on 3000');
});