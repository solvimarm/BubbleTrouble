/*
    Constructor:

    new Ball({
        cx: 10,
        cy: 10,
        size: 0
    });

*/

var BallStyles = [
    {maxBounce: 50, radius: 9},     // type 0
    {maxBounce: 80, radius: 20},    // type 1
    {maxBounce: 110, radius: 30},   // type 2
    {maxBounce: 140, radius: 40}    // type 3
]

function Ball(descr){
    this.setup(descr);

    // TODO: Add more styles / types.
    this.radius = BallStyles[this.type].radius;
    this.maxBounce = BallStyles[this.type].maxBounce;
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

Ball.prototype.hitBall = function() {
    maybeCreatePower(this.cx , this.cy);
    this.kill();
   // console.log(this);
    if(this.type > 0) {
         entityManager.generateBall({
            cx: this.cx,
            cy: this.cy,
            velX: -1,
            velY: -3,
            type: this.type-1,
            sprite: this.sprite
        });
        entityManager.generateBall({
            cx: this.cx,
            cy: this.cy,
            velX: 1,
            velY: -3,
            type: this.type-1,
            sprite: this.sprite
        });
        
    }
    
}

Ball.prototype.update = function(du){
    spatialManager.unregister(this);
    // TODO: Remove. Used for testing only.
    if (this._isDeadNow) {
        //this.hitBall();
        return entityManager.KILL_ME_NOW;
    }
    
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