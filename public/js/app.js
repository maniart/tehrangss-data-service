window.app = window.app || {};

app.emotionTrackers = {
	happinessSadness: { tracker: null, index: 0 },
	anger: { tracker: null, index: 1 },
	fear: { tracker: null, index: 2 },
	disgust: { tracker: null, index: 3 },
	surprise: { tracker: null, index: 4 }
};

app.MAX_TRACKER_INDEX = 4;

app.initialized = false;

app.currentEmotionTrackerIndex = null;

app.setCurrentEmotionTracker = function setCurrentEmotionTracker(index) {
	app.currentEmotionTrackerIndex = index;
}

app.nextEl = null;

app.submitEl = null;

app.endPoint = '/api/emotion';

app.sync = function sync(successCb, failCb) {
	$.ajax({
	    type: 'POST',
	    url: app.endPoint,
	    data: JSON.stringify(app.data), // or JSON.stringify ({name: 'jonas'}),
	    contentType: 'application/json',
	    dataType: 'json'
	}).done(function() {
		console.log('done! ', arguments);
		successCb();
	}).fail(function() {
		console.log('fail ', arguments);
		failCb();
	}).always(function() {
		console.log('always');
	});
}

app.next = function next() {
	//app.currentEmotionTracker.tearDown();
	console.log('next was called');
};

app.getLocation = function getLocation() {
	console.log('get location');
}

app.registerEvents = function registerEvents() {
	app.nextEl.on('touchend', function(e) {
		console.log('next');
		if (app.currentEmotionTracker && app.currentEmotionTracker.index < app.MAX_TRACKER_INDEX) {
			app.next();
			// if it's the last one, hide "next" and show "submit"
			
			if ( true ) {
				app.nextEl.removeClass('visible');
				app.submitEl.addClass('visible');
			} else {
				// otherwise, setup the next tracker
			}
		}
	});

	app.submitEl.on('click touchend', function(e) {
		e.preventDefault();
		console.log('submit - ', app.data);
		// app.sync();
	})
};

app.reset = function reset() {
	app.data = {
		happiness : 0,
		sadness: 0,
		anger: 0,
		fear: 0,
		disgust: 0,
		surprise: 0
	};
};

app.init = function init() {
	// reset state upon initialization
	// debugger;
	if(app.initialized) {
		console.log('app already initialized, aborting');

	}
	app.nextEl = $('.next');
	app.submitEl = $('.submit');
	app.reset();
	app.getLocation();
	app.registerEvents();
};

