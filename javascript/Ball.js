/*
    Constructor:

    new Ball({
        cx: 10,
        cy: 10,
        size: 0
    });

*/

var BallStyles = [ // The number comments are total hits.
    {maxBounce: 40, radius: 8, color: "Red"}, // 1
    {maxBounce: 60, radius: 14, color: "Blue1"}, // 3
    {maxBounce: 70, radius: 20, color: "Green"}, // 7
    {maxBounce: 80, radius: 24, color: "Brown1"}, // 15
    {maxBounce: 85, radius: 28, color: "Orange"}, // 31
    {maxBounce: 90, radius: 32, color: "Purple"}, // 63 
    {maxBounce: 90, radius: 36, color: "Yellow2"}, // 127   ALERT! Using balls past this point may lead to dull game. 
    {maxBounce: 85, radius: 40, color: "SeaGreen"}, // 255
    {maxBounce: 85, radius: 44, color: "Pink"}, // 511
    {maxBounce: 85, radius: 48, color: "Blue2"}, // 1027
    {maxBounce: 80, radius: 50, color: "Brown2"}, // 2047
    {maxBounce: 70, radius: 52, color: "GreenBlue"}, // 4095
    {maxBounce: 70, radius: 54, color: "Grey"}, // 8192
    {maxBounce: 70, radius: 56, color: "LightBlue"}, // 
    {maxBounce: 70, radius: 58, color: "LightGreen"},
    {maxBounce: 70, radius: 60, color: "WineRed"},
    {maxBounce: 70, radius: 65, color: "Yellow1"}
]

function Ball(descr){
    this.setup(descr);
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

Ball.prototype.hitBall = function() {
    maybeCreatePower(this.cx , this.cy);
    this.kill();
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
    if(FREEZE){
        du /= 3;
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
    this.sprite.drawCentredAt(ctx, this.cx + g_canvas.width, this.cy, 0);
    this.sprite.drawCentredAt(ctx, this.cx - g_canvas.width, this.cy, 0);
};