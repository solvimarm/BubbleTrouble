
function Bullet(descr){
    this.setup(descr);

    if(this.type === "chain"){
        this.bullet = g_sprites.bullet[0];
        this.lifeSpan = 3*SECS_TO_NOMINALS;
        this.fireSound = new Audio("Sounds/chain.wav");
        this.fireSound.play();
    }
    if(this.type === "default"){
        this.bullet = g_sprites.bullet[1];
        this.lifeSpan = 0;
        this.fireSound = new Audio("Sounds/laser_blaster2.wav");
        this.fireSound.play();
    }
    if(this.type === 3){
        this.bullet = g_sprites.bullet[2];
        this.lifeSpan = 0;
        this.fireSound = new Audio("Sounds/laser_blaster.wav");
        this.fireSound.play();
    }
    if(this.type === 4){
        this.bullet = g_sprites.bullet[3];
    }
    if(this.type === 5){
        this.bullet = g_sprites.bullet[4];
    }
}

Bullet.prototype = new Entity();
Bullet.prototype.type = "default";
Bullet.prototype.velY = 2;
Bullet.prototype.lifeSpan = 3*SECS_TO_NOMINALS;
var ball_sound = new Audio("Sounds/Ball.wav");


Bullet.prototype.update = function(du){
    spatialManager.unregister(this);
    
    if(this.yTop <= 0 && this.type === "default"){
        this.fireSound.pause();
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
            this.fireSound.pause();
            ball_sound.play();
            return entityManager.KILL_ME_NOW;
        }
    }
    if(this.yTop <= 0 ){
        this.lifeSpan -= du;
    }
    
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
    }
};

