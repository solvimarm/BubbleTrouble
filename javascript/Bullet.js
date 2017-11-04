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

    if(this.type === 1){
        this.bullet = g_sprites.bullet_1;
    }
    if(this.type === 2){
        this.bullet = g_sprites.bullet_2;
    }
    if(this.type === 3){
        this.bullet = g_sprites.bullet_3;
    }
}

Bullet.prototype = new Entity();
Bullet.prototype.type = "default";
Bullet.prototype.velY = 2;


Bullet.prototype.update = function(du){
    spatialManager.unregister(this);
	if(this.yTop <= 0){
		return entityManager.KILL_ME_NOW; 
    }
    var hitEntity = this.findWallEntity();
    var hitBallEntity = this.findHitEntity();
    if(hitBallEntity){
        hitBallEntity.hitBall();
        return entityManager.KILL_ME_NOW;
    }
    if(hitEntity) return entityManager.KILL_ME_NOW;
    
    if(this.type === 2){
        this.yTop -= du*20;
    }
    else{
        this.yTop -= du*6;
    }

    spatialManager.register(this);
};

Bullet.prototype.render = function(ctx){
    this.bullet.drawBullet(ctx, this.cx, this.yTop);
};

Bullet.prototype.collisionWithWall = function(wallx,wally,width,height){
    if(this.cx >= wallx && this.cx <= wallx + width){
        console.log(this.cy + "    "+ this.yTop);
    }
};

