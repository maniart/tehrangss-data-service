var http = require('http');
var express = require('express');
var io = require('socket.io');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mock = require('./utils/mock.js');
var mockEmotions = mock.emotions;
var mongoose = require('mongoose');    
var Schema = mongoose.Schema;
var ObjectIs = Schema.ObjectId;

// Model
var EmotionSchema = new Schema({
	date: { type: Date, default: Date.now },
	lon: { type: Number, default: 0.0 },
	lat: { type: Number, default: 0.0 },
	happiness: { type: Number, default: 0.0 },
	sadness: { type: Number, default: 0.0 },
	anger: { type: Number, default: 0.0 },
	fear: { type: Number, default: 0.0 },
	surprise: { type: Number, default: 0.0 },
	disgust: { type: Number, default: 0.0 },
});

var TextSchema = new Schema({
	date: { type: Date, default: Date.now },
	lon: { type: Number, default: 0.0 },
	lat: { type: Number, default: 0.0 },
	text: { type: String, default: ''},
	emotion: { type: String, default: '' }
});

var Emotion = mongoose.model('Emotion', EmotionSchema);
var Text = mongoose.model('TextSchema', TextSchema);

// db config 
var dbConfig = require('./.dbconfig.json');
var dbURL = dbConfig.url;

// mongoose stuff
mongoose.connect(dbURL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var app = express();
var router = express.Router();

app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/api/submit', function(req, res) {
	console.log(req.body);
	var emotion = mockEmotions();
	new Emotion({
		lon: req.body.lon,
		lat: req.body.lat,
		fear: emotion.fear,
		happiness: emotion.happiness,
		sadness: emotion.sadness,
		surprise: emotion.surprise,
		disgust: emotion.disgust,
		anger: emotion.anger
	}).save();
	res.sendStatus(200);
});

app.post('/api/submit-text', function(req, res) {
	console.log(req.body);
	new Text({
		lon: req.body.lon,
		lat: req.body.lat,
		text: req.body.text,
		emotion: req.body.emotion
	}).save();
	res.sendStatus(200);
});

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

router.post('/emotion', function(req, res) {
	console.log('test');
	var body = req.body;
	console.dir(req.body);
	res.send('ok');
});


router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

router.get('/about', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', '/about.html'));
});

app.use(router);

app.listen(3000, function() {
	console.log('App serving on 3000');
});