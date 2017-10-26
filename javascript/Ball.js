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
}

Ball.prototype = new Entity();

Ball.prototype.velX = 1;
Ball.prototype.velY = 0;


Ball.prototype.update = function(du){
    // TODO

    // v = -sqrt(m*g)  => Toppurinn á skoppinu er í hæð m.
    // Ef það rekst á botnin, velY = -Math.sqrt(this.maxBounce * 9.82);
};

Ball.prototype.render = function(ctx){
    // TODO
};