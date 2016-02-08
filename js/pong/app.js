WIDTH = $(window).width(), HEIGHT = $(window).height(), PI=Math.PI;
COLORS = ['#FFFFFF', '#FF4A4A', '#C27E00', '#FFFF00', '#3ADB00', '#0066DB', '#C200DB'];

var upArrow = 38, downArrow = 40;
var canvas, ctx, keystate;
var player, ai, ball;
var paused = false;
var started = false;
var colorIndex = 0;

function togglePaused() {
	if (started) {
		paused = !paused;
		if (paused == false) {
			$('#instructions').html('Press [space] to pause');
		} else {
			$('#instructions').html('Press [space] to resume');
		}
	}
}

function startPong() {
	canvas = document.createElement("canvas");
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	ctx = canvas.getContext("2d");
	var pongContainer = $('#pong-container');
	pongContainer.append(canvas);

	keystate = {};
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	init();

	var loop = function(){
		if (!paused) {
			update();
			draw();
		}

		window.requestAnimationFrame(loop, canvas);

	};
	window.requestAnimationFrame(loop, canvas);
}