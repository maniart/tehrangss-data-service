function EmotionTracker() {
	this.rawValue = 0;
	this.normalizedValue = 0;
}

EmotionTracker.prototype.set = function set(newValue) {
	this.rawValue = newValue;
};

EmotionTracker.prototype.normalize = function normalize() {

};

EmotionTracker.map = function map(inputMin, inputMax, outputMin, outputMax, floating) {
	// map 
	var input = this.rawValue;
	var result = (input - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
	return parseFloat(result.toFixed(floating));
};

EmotionTracker.init = function init() {
	console.log('init');
	return this.setup();
}

EmotionTracker.prototype.setup = function setup() {
	console.log('setup');
	return this.registerEvents();
};

EmotionTracker.prototype.tearDown = function tearDown() {
	console.log('tear down');
}

EmotionTracker.prototype.registerEvents() = function registerEvents() {
	console.log('register events');
	return this;
}

EmotionTracker.onChange = function onChange(newValue) {
	return this.set(newValue);
}


