player = {
	x: null,
	y: null,
	width: 20,
	height: 100,
	score: 0,

	update: function() {
		if (keystate[upArrow] && this.y > 0) this.y -= 7;
		if (keystate[downArrow] && (this.y + this.height) < HEIGHT) this.y += 7;
	},
	draw: function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}