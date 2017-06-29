var mock = {};

mock.emotions = function() {
	var vectors = [
		'happiness',
		'sadness',
		'anger',
		'fear',
		'digust',
		'surprise'
	];

	var ret = {};

	vectors.forEach(function(vector, index) {
		ret[vector] = parseFloat(Math.random().toFixed(4), 10);
	});

	return ret;
};

mock.geo = function() {
	
};

module.exports = mock;