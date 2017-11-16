/*
    Constructor:

    new Ball({
        cx: 10,
        cy: 10,
        size: 0
    });

*/

var BallStyles = [
    {maxBounce: 40, radius: 8, color: "Red"},     // type 0
    {maxBounce: 70, radius: 16, color: "Blue1"},    // type 1
    {maxBounce: 100, radius: 25, color: "Green"},   // type 2
    {maxBounce: 120, radius: 35, color: "Pink"},    // type 3
    {maxBounce: 120, radius: 40, color: "SeaGreen"},    // type 4
    {maxBounce: 100, radius: 45, color: "Brown1"},    // type 5
    
]

function Ball(descr){
    this.setup(descr);

    // TODO: Add more styles / types.
    this.radius = BallStyles[this.size].radius;
    this.maxBounce = BallStyles[this.size].maxBounce;
    this.sprite = g_sprites.Ball[BallStyles[this.size].color];
    this.ball_sound = new Audio("Sounds/Ball.wav");
}

Ball.prototype = new Entity();

Ball.prototype.velX = 1;
Ball.prototype.velY = 0;

Ball.prototype.position = function(){
    this.cx = 300;
    this.cy = 300;
};
Ball.prototype.getRadius = function(){
    return this.radius;
};

//var ball_sound = new Audio("Sounds/Ball.wav");

Ball.prototype.hitBall = function() {
    maybeCreatePower(this.cx , this.cy);
    this.kill();
   // console.log(this);
    if(this.size > 0) {
         entityManager.generateBall({
            cx: this.cx,
            cy: this.cy,
            velX: -1,
            velY: -3,
            size: this.size-1
        });
        entityManager.generateBall({
            cx: this.cx,
            cy: this.cy,
            velX: 1,
            velY: -3,
            size: this.size-1
        });
    }
    entityManager.ballHit();
}

Ball.prototype.update = function(du){
    spatialManager.unregister(this);

    if (this._isDeadNow) {
        //this.ball_sound.play();
        return entityManager.KILL_ME_NOW;
    }
    
    if(spatialManager.ballCollidesWithCeiling(this.cx, this.cy, this.radius)) {
        this.hitBall();
    }
    if(!FREEZE){
        var newDirections = spatialManager.ballCollidesWithWall(
            this.cx, this.cy, this.radius, this.velX, this.velY
        );
    
        if(newDirections.velY < 0 && this.velY > 0) {
        newDirections.velY = -2*Math.sqrt(this.maxBounce*consts.NOMINAL_GRAVITY);
        }
        this.velX = newDirections.velX;
        this.velY = newDirections.velY;

        var newCoords = this._getNextCoords(du);

        // TODO: Collision with walls / ground.
        if(newCoords.nextY + this.radius > g_canvas.height-100) {
            this.velY = -2*Math.sqrt(this.maxBounce*consts.NOMINAL_GRAVITY);
            newCoords = this._getNextCoords(du);
        }

        this.cx = newCoords.nextX;
        this.cy = newCoords.nextY;
        this.velY = newCoords.newVelY;
    }
    spatialManager.register(this);

};

Ball.prototype._getNextCoords = function(du) {
    var oldVelY = this.velY;
    var newVelY = oldVelY + consts.NOMINAL_GRAVITY * du;
  
    var aveVelY = (oldVelY + newVelY)/2;
    var intervalVelY = g_useAveVel ? aveVelY : newVelY;
    
    var nextX = util.mod(this.cx + this.velX * du, g_canvas.width);
    var nextY = util.mod(this.cy + intervalVelY * du, g_canvas.width);

    return {
        nextX: nextX,
        nextY: nextY,
        newVelY: newVelY
    };
};

Ball.prototype.render = function(ctx){
    var radiusToSpriteScale = this.radius/90;
    this.sprite.scale = radiusToSpriteScale;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0);
};