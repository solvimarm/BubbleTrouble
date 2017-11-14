
function Lives(descr){
    this.setup(descr);
}

Lives.prototype = new Entity();

Lives.prototype.update = function(du){

};

Lives.prototype.render = function(ctx){
	ctx.fillStyle = "black"
    ctx.fillRect(300,535,125,30);

	for(var i = 0; i < g_LIVES; i++){
		g_sprites.Power_LiveRedHeart.drawWrappedCentredAt(ctx, this.cx+(i*POWER_IMAGE_HEIGHT), this.cy);
	}
};