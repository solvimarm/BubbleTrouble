/*
    Constructor:

    new Bullet({
        cx  : 10,
        yTop: 10,
        type: 0
    });

*/

/*
Bullet er þannig að cx er miðpunkturinn á x-ás og
yTop er topppunkturinn. Það er held ég best að vera með þennan punkt (cx,yTop)
þegar það kemur að framtíðinni að athuga með boltanna. - Svenni
*/


function Bullet(descr){
    this.setup(descr);
}

Bullet.prototype = new Entity();
Bullet.prototype.type = "default";
Bullet.prototype.velY = 2;


Bullet.prototype.update = function(du){
	//spatialManager.unregister(this);
	if(this.yTop <= 0){
		return entityManager.KILL_ME_NOW; 
	}
	this.yTop -= du*2;
    spatialManager.register(this);
};

Bullet.prototype.render = function(ctx){
        g_sprites.bullet.drawBullet(ctx, this.cx, this.yTop);
};