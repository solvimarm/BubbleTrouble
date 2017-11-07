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

    if(this.type === "chain"){
        this.bullet = g_sprites.bullet_1;
        this.lifeSpan = 3*SECS_TO_NOMINALS;
    }
    if(this.type === "default"){
        this.bullet = g_sprites.bullet_2;
        this.lifeSpan = 0;
    }
    if(this.type === 3){
        this.bullet = g_sprites.bullet_3;
    }
    if(this.type === 4){
        this.bullet = g_sprites.bullet_4;
    }
    if(this.type === 5){
        this.bullet = g_sprites.bullet_5;
    }
}

Bullet.prototype = new Entity();
Bullet.prototype.type = "default";
Bullet.prototype.velY = 2;
Bullet.prototype.lifeSpan = 3*SECS_TO_NOMINALS;


Bullet.prototype.update = function(du){
    spatialManager.unregister(this);
    if(this.yTop <= 0 && this.type === "default"){
        return entityManager.KILL_ME_NOW; 
    }

    if(this.lifeSpan <= 0 && this.type === "chain"){
        return entityManager.KILL_ME_NOW;
    }
    var hitEntity = this.findWallEntity();
    var hitBallEntity = this.findHitEntity();
    if(hitBallEntity){
        if(!hitBallEntity.power){
            hitBallEntity.hitBall();
            return entityManager.KILL_ME_NOW;
        }
    }
    if(this.yTop <= 0 ){
        this.lifeSpan -= du;
    }
    console.log(this.type);
    console.log(this.lifeSpan);
    
    if(hitEntity) return entityManager.KILL_ME_NOW;
    
    if((this.type === "default" || this.type === 5)&&this.yTop > 0){
        this.yTop -= du*15;
    }
    else if(this.yTop > 0){
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

