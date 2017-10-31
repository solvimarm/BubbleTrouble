/*
    Constructor:

    new Ball({
        cx: 10,
        cy: 10,
        size: 0
    });

*/

var BallStyles = [
    {color: "#123456", maxBounce: 90, radius: 10},
    {color: "#121212", maxBounce: 120, radius: 15}
]

function Ball(descr){
    this.setup(descr);
    this.cx = 100;
    this.cy = 100;
    this.sprite = this.sprite || g_sprites.YellowBall;
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
    // TODO
    // v = -sqrt(m*g)  => Toppurinn á skoppinu er í hæð m.
    // Ef það rekst á botnin, velY = -Math.sqrt(this.maxBounce * 9.82);
};

Ball.prototype.render = function(ctx){
    // TODO
    console.log(levels[0].ball_cx);
    for(var i = 0; i < levels[0].ball_cx.length;i++){
        this.sprite.scale = 0.8;
        this.sprite.drawCentredAt(ctx, levels[0].ball_cx[i], levels[0].ball_cy[i], this.rotation);
    }
};