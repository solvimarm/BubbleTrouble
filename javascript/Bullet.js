
function Bullet(descr){
    this.setup(descr);

    if(this.type === "chain_gray"){
        this.bullet = g_sprites.bullet[0];
        this.lifeSpan = 0;
        this.velY = 5;
        this.fireSound = new Audio("Sounds/chain.wav");
        this.fireSound.play();
    }
    if(this.type === "ray_yellow"){
        this.bullet = g_sprites.bullet[1];
        this.lifeSpan = 0;
        this.velY = 15;
        this.fireSound = new Audio("Sounds/laser_blast1.wav");
        this.fireSound.play();
    }
    if(this.type === "ray_green"){
        this.bullet = g_sprites.bullet[2];
        this.lifeSpan = 3*SECS_TO_NOMINALS;
        this.velY = 15;
        this.fireSound = new Audio("Sounds/laser_blast2.wav");
        this.fireSound.play();
    }
    if(this.type === "chain_red"){
        this.bullet = g_sprites.bullet[3];
        this.lifeSpan = 3*SECS_TO_NOMINALS;
        this.velY = 5;
        this.fireSound = new Audio("Sounds/chain.wav");
        this.fireSound.play();
    }
}

Bullet.prototype = new Entity();
//Bullet.prototype.type = "default";
//Bullet.prototype.velY = 8;
//Bullet.prototype.lifeSpan = 3*SECS_TO_NOMINALS;

var ball_sound = new Audio("Sounds/Ball.wav");


Bullet.prototype.update = function(du){
    spatialManager.unregister(this);
    
    //if(this.yTop <= 0 && this.type === "default"){
    //    this.fireSound.pause();
    //    return entityManager.KILL_ME_NOW; 
    //}

    if(this.lifeSpan <= 0 && this.yTop <= 0){
        return entityManager.KILL_ME_NOW;
    }
    
    var hitBallEntity = this.findHitEntity();
    if(hitBallEntity){
        if(!hitBallEntity.power){
            hitBallEntity.hitBall();
            this.fireSound.pause();
            ball_sound.play();
            return entityManager.KILL_ME_NOW;
        }
    }

    var hitY = this.findWallEntity();
    
    if(hitY === undefined) {
        if(this.yTop > 0) {
            if(characterChosen === 3)
                this.yTop -= du*this.velY/2
            else
                this.yTop -= du*this.velY;            
        }
    }
    else {
        if(this.yTop > hitY) {
            this.yTop -= du*this.velY;
        }
        else{
            if(this.lifeSpan < 0) {
                return entityManager.KILL_ME_NOW;
            }
            else {
                this.lifeSpan -= du;
            }
        }
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

