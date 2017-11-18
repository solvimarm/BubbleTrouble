function Lives(descr) {
	this.setup(descr);
}

Lives.prototype = new Entity();

Lives.prototype.update = function (du) {

};

Lives.prototype.render = function (ctx) {
	//ctx.shadowOffsetX = 0;
    //ctx.shadowOffsetY = 0;
    //ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(99, 208, 255, 0.6)';
	ctx.fillStyle = "black"
	ctx.fillRect(334.5, 535, 131, 30);
	for (var i = 0; i < g_LIVES; i++) {
		g_sprites.Power_LiveRedHeart.drawWrappedCentredAt(ctx, this.cx + (i * POWER_IMAGE_HEIGHT), this.cy);
	}
};