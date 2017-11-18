function LevelP(descr) {
    this.setup(descr);
}

LevelP.prototype = new Entity();

LevelP.prototype.update = function (du) {};

LevelP.prototype.render = function (ctx) {
    drawCurrentLevel(ctx, this.map_number+1);
};

function drawCurrentLevel(ctx, map_number){
    var stringLevel = map_number.toString();
    var string = "Level : " + stringLevel;
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(string, 20, 585);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeText(string,20,585);
}