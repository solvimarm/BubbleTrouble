/*
    Constructor:

    new Ball({
        cx: 10,
        cy: 10,
        size: 0
    });

*/

var BallStyles = [
    {color: "#123456", maxBounce: 110, radius: 10},
    {color: "#121212", maxBounce: 140, radius: 15}
]

function Ball(descr){
    this.setup(descr);
    this.sprite = this.sprite || g_sprites.YellowBall;

    // TODO: Add more styles / types.
    this.radius = BallStyles[this.type % 2].radius;
    this.maxBounce = BallStyles[this.type % 2].maxBounce;
}

Ball.prototype = new Entity();

Ball.prototype.velX = 1;
Ball.prototype.velY = 0;

Ball.prototype.position = function(){
    this.cx = 300;
    this.cy = 300;
};
Ball.prototype.getRadius = function(){
    return 100;
};

Ball.prototype.update = function(du){

    newCoords = this._getNextCoords(du);
    // TODO: Collision with walls / ground.
    if(newCoords.nextY + this.radius > g_canvas.height) {
        this.velY = -2*Math.sqrt(this.maxBounce*consts.NOMINAL_GRAVITY);
        newCoords = this._getNextCoords(du);
    }

    this.cx = newCoords.nextX;
    this.cy = newCoords.nextY;
    this.velY = newCoords.newVelY;

    //console.log(this.cx + ", " + this.cy);
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
    
    this.sprite.scale = 0.8;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0);

    // Boltarnir ættu allir að vera í entityManager._balls. Óþarfi að loop'a í gegnum þá hér.

    //console.log(levels[0].ball_cx);
    //for(var i = 0; i < levels[0].ball_cx.length;i++){
    //    this.sprite.scale = 0.8;
    //    this.sprite.drawCentredAt(ctx, levels[0].ball_cx[i], levels[0].ball_cy[i], this.rotation);
    //}
};

