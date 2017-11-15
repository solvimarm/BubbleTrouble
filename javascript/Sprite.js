// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image, sx, sy, width,height,scale) {
    if(typeof sx === "undefined") sx = 0;
    if(typeof sy === "undefined") sy = 0;
    if(typeof scale === "undefined") scale = 1;
    this.image = image;
    this.sx = sx;
    this.sy = sy;
    //this.width = image.width || width;
    this.width = width || image.width;
    //this.height = image.height || width;
    this.height = height ||image.height;
    this.scale = scale;
}

Sprite.prototype.drawAt = function (ctx, x, y, swidth, sheight) {
    if(swidth === undefined && sheight === undefined) {
        ctx.drawImage(this.image, x, y);
    }
    else if(swidth === undefined) {
        ctx.drawImage(this.image, x, y, sheight=sheight);
    }
    else if(sheight === undefined) {
        ctx.drawImage(this.image, x, y, swidth=swidth);
    }
    else {
        ctx.drawImage(this.image, x, y, swidth=swidth, sheight=sheight);
    }
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (typeof rotation === "undefined") rotation = 0;
    var w = this.width,
        h = this.height;
        //console.log(w+"      w og h    "+h);
    //console.log("drawCenteredAt");
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.image, 
                  this.sx, this.sy,
                  this.width,this.height,
                  -w/2, -h/2,
                 
                  this.width,this.height);

    ctx.restore();
};

Sprite.prototype.drawBullet = function (ctx, cx, yTop) {
    var w = this.width, h = this.height;
    ctx.save();
    ctx.rotate(0);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.image, cx - w/2, yTop);
    ctx.restore();
};




Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
