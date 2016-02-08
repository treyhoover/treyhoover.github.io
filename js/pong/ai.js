ai = {
	x: null,
	y: null,
	width: 20,
	height: 100,
	score: 0,

	update: function() {
		var desty = ball.y - (this.height - ball.side)*0.5;
		desty = Math.min(Math.max(0, desty), (HEIGHT-this.height));

		this.y += (desty - this.y) * 0.1;
	},
	draw: function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}