var http = require('http');
var express = require('express');
var io = require('socket.io');
var path = require('path');
var bodyParser = require('body-parser');

var mock = require('./utils/mock.js');

var mockEmotions = mock.emotions;

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(express.static('static'));


router.get('/emotions/:count', function(req, res) {
	var countParam = req.params.count || 10;
	var count = parseInt(countParam, 10);
	var i = 0;
	var ret = [];
	console.log(mockEmotions);
	for(i = 0; i < count; i ++) {
		ret.push(mockEmotions());
	}
	// res.writeHead(200, {'Content-Type': 'application/json'});
	res.send(ret);
});

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'static', '/index.html'));
});

app.use(router);

app.listen(3000, function() {
	console.log('App serving on 3000');
});