function init() {
	console.log('initialize all the things, baby!');
	var app = window.app;

	app.init();

	var emotionTrackers = app.emotionTrackers;

	emotionTrackers.happinessSadness.tracker = new EmotionTracker('Happiness / Sadness');
	emotionTrackers.anger.tracker = new EmotionTracker('anger');
	emotionTrackers.fear.tracker = new EmotionTracker('fear');
	emotionTrackers.disgust.tracker = new EmotionTracker('disgust');
	emotionTrackers.surprise.tracker = new EmotionTracker('Surprise');

	// app.setCurrentEmotionTracker()
};

$(document).ready(function() {
	// debugger;
	init();
});