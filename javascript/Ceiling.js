/*
    Ceiling: 
    
    Wall covered in sharp spikes at the top. 
    Can move at a constant vertical speed.
    (E.g. gravity does not effect speed).

    The y coordinates are relative to the bottom of the spikes.
    The bottom attribute should be used for collision checking.
*/


function Ceiling(descr){
    this.setup(descr);

    this.bottom = this.y + this.SPIKE_HEIGHT;
    this.vel = this.vel/5;
}

Ceiling.prototype = new Entity();

Ceiling.prototype.SPIKE_HEIGHT = 12;
Ceiling.prototype.SPIKE_WIDTH = 5;
Ceiling.prototype.minX = 0;
Ceiling.prototype.maxX = g_canvas.width;
Ceiling.prototype.y = 0;
Ceiling.prototype.vel = 0;


Ceiling.prototype.update = function(du) {
    spatialManager.unregister(this);
    this.y = this.y + this.vel * du;
    if(this.y < 0) {
        this.vel = 0;
        this.y = 0;
    }

    // TODO: Check for floor instead when floor has been implemented.
    if(this.y + this.SPIKE_HEIGHT > g_canvas.height) {
        this.vel = 0;
        this.y = g_canvas.height - this.SPIKE_HEIGHT;
    }
    this.bottom = this.y + this.SPIKE_HEIGHT;
    spatialManager.register(this);
};

Ceiling.prototype.render = function(ctx) {
    // TODO: Replace this function with sprites. The canvas drawings are temporary.

    var oldStyle = ctx.fillStyle;
    
    var width = this.maxX - this.minX;
    // fillBox(ctx, x, y, w, h, style)
    util.fillBox(ctx, this.minX, 0, width, this.y+1, "#888888");

    // Draws spikes
    ctx.beginPath();
    ctx.moveTo(this.minX, this.y);
    ctx.fillStyle = "#888888";
    for(var i = 0; i < width / this.SPIKE_WIDTH; i++) {
        ctx.lineTo(this.minX + (i + 0.5)*this.SPIKE_WIDTH, this.y + this.SPIKE_HEIGHT);
        ctx.lineTo(this.minX + (i + 1)*this.SPIKE_WIDTH, this.y);
    }
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = oldStyle;
};