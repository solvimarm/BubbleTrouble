/*
    Constructor:

    new Bullet({
        x: 10,
        y: 10,
        type: 0
    });

*/

function Bullet(descr){
    this.setup(descr);
}

Bullet.prototype = new Entity();
Bullet.prototype.type = "default";


Bullet.prototype.update = function(du){
	//spatialManager.unregister(this);
	if(this.cy <= 0){
		return entityManager.KILL_ME_NOW; 
	}
	this.cy -= du*2;
    spatialManager.register(this);
};

Bullet.prototype.render = function(ctx){
        g_sprites.bullet.drawWrappedCentredAt(
        ctx, this.cx, this.cy
    );
};