function Lives(descr) {
	this.setup(descr);
}

Lives.prototype = new Entity();

Lives.prototype.update = function (du) {};

Lives.prototype.render = function (ctx) {
	ctx.fillStyle = "#663f0d"
	ctx.fillRect(334.5-5, 545-5, 131+10, 30+10);
	ctx.fillStyle = "black"
	ctx.fillRect(334.5, 545, 131, 30);
	for (var i = 0; i < g_LIVES; i++) {
		g_sprites.Power_LiveRedHeart.drawWrappedCentredAt(ctx, this.cx + (i * POWER_IMAGE_HEIGHT), this.cy);
	}
};