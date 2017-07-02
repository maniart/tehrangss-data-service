window.app = window.app || {};

app.emotionTrackers = {
	happinessSadness: null,
	anger: null,
	fear: null,
	disgust: null,
	surprise: null
};

app.endPoint = '/api/emotion';

app.sync = function sync() {
	$.ajax({
	    type: 'POST',
	    url: app.endPoint,
	    data: JSON.stringify(app.data), // or JSON.stringify ({name: 'jonas'}),
	    contentType: 'application/json',
	    dataType: 'json'
	}).done(function() {
		console.log('done! ', arguments);
	}).fail(function() {
		console.log('fail ', arguments);
	}).always(function() {
		console.log('always');
	});
}

app.reset = function reset() {
	app.data = {
		happiness : 0,
		sadness: 0,
		anger: 0,
		fear: 0,
		disgust: 0,
		surprise: 0
	};
}

app.init = function init() {
	// reset state upon initialization
	app.reset();
}

app.init();