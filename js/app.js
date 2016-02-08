$(document).ready(function() {

	// $('#pong-container').on('click', togglePaused);

	window.addEventListener("keydown", function(e) {
			// use space bar, enter to pause
			if([32, 13].indexOf(e.keyCode) > -1) {
				e.preventDefault();
				
				if(!started) {
					$('#instructions').html('Press [space] to pause');
					$('.score').show();
					started = true;
					startPong();
				} else {
					togglePaused();
				}
			}

	    // prevent arrow keys from scrolling when playing
	    if(!paused && started && [37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	      e.preventDefault();
	    }
	}, false);

});