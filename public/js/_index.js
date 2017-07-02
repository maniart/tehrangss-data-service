$(document).ready(function() {

	var $body = $('body');
	var $container = $('.container');
	var $instructions = $('.instructions');

	var r = 0;
	var g = 0;
	var b = 0;

	function getRgb(r, g, b) {
		return [
			'rgb(',
			r,
			',',
			g,
			',',
			b,
			')'
		].join('');
	}

	var windowheight = window.innerHeight;

	var normalizedValue = 0;
	var eightbitValue = 0;

	function mapValue(input, inputmin, inputmax, outputmin, outputmax, floatingpoints) {
		var result = (input - inputmin) * (outputmax - outputmin) / (inputmax - inputmin) + outputmin;
		return parseFloat(result.toFixed(floatingpoints));
	}
	
	$body.on('touchstart', function(e) {
		$instructions.addClass('out');
		// console.log('start ', e);
	});

	$body.on('touchend', function(e) {
		// console.log('end ', e.changedTouches[0].clientY);
		// debugger;
		$instructions.removeClass('out');
	});

	$body.on('touchmove', function(e) {
		normalizedValue = mapValue(e.changedTouches[0].clientY, 0 , windowheight, 0, 1, 4);
		eightbitValue = mapValue(e.changedTouches[0].clientY, 0 , windowheight, 0, 255, 0);
		// console.log(normalizedValue, eightbitValue);
		console.log(getRgb(eightbitValue, eightbitValue, eightbitValue))
		$body.css({
			background: getRgb(0, 255 - eightbitValue, eightbitValue)
			// backgroundColor: 'rgb(2,2,2)'
		});
		// console.log('move ', e);
		// console.log('move ', e.changedTouches[0].clientY);
	});

});