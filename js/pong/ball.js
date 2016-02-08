ball = {
	x: null,
	y: null,
	vel: null,
	speed: 15,
	side: 20,

	serve: function(side) {
		var r = Math.random();
		this.x = side === 1 ? player.x : ai.x - this.side;
		this.y = (HEIGHT - this.side)*r;

		var phi = 0.1*PI*(1-2*r);
		this.vel = {
			x: side*this.speed*Math.cos(phi),
			y: this.speed*Math.sin(phi)
		}
	},

	update: function() {
		this.x += this.vel.x;
		this.y += this.vel.y;

		if (0 > this.y || this.y + this.side > HEIGHT) {
			var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
			this.y += 2*offset;
			ball.vel.y *= -1;
		}

		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};

		var pdle = this.vel.x < 0 ? player : ai;
		if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
			this.x, this.y, this.side, this.side)
		) {
			this.x = pdle===player ? player.x + player.width : ai.x - this.side;
			var n = (this.y+this.side - pdle.y)/(pdle.height+this.side);
			var phi = 0.25*PI*(2*n - 1);

			var smash = Math.abs(phi) > 0.2*PI ? 1.5 : 1;
			this.vel.x = smash * (pdle===player ? 1 : -1) * this.speed*Math.cos(phi);
			this.vel.y = smash * this.speed*Math.sin(phi);
		}

		if (0 > this.x+this.side || this.x > WIDTH) {
			
			if (0 > this.x+this.side) {
				ai.score += 1;
				$('#my-score').html(ai.score);
				colorIndex = 0;
			} else {
				player.score += 1;
				$('#your-score').html(player.score);
				colorIndex = (colorIndex + 1)%COLORS.length;
			}

			x: this.serve(pdle===player ? 1 : -1);
		}
	},
	draw: function() {
		ctx.fillRect(this.x, this.y, this.side, this.side);
	}
}

function init() {
	player.x = player.width;
	player.y = (HEIGHT - player.height)/2;

	ai.x = WIDTH - (player.width + ai.width);
	ai.y = (HEIGHT - ai.height)/2;

	ball.x = (WIDTH - ball.side)/2;
	ball.y = (HEIGHT - ball.side)/2;

	ball.serve(1);
}

function update() {
	ball.update();
	player.update();
	ai.update();
}

function draw() {

	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.save();

	ctx.fillStyle = COLORS[colorIndex];

	ball.draw();
	player.draw();
	ai.draw();

	var w = 4;
	var x = (WIDTH - w) * 0.5;
	var y = 0;
	var step = HEIGHT/15;

	ctx.restore();
}