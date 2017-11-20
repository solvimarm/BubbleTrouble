/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
_circAndRectCollision: function(circX, circY, radius, circVelX, circVelY, rectX, rectY, width, height) {
    var x = circX - (rectX + width/2);
    var y = circY - (rectY + height/2);
    var absX = Math.abs(x);
    var absY = Math.abs(y);
    
    if(absX > radius + width/2 || absY > radius + height/2) {
        // Center of ball too far away for collision
        return undefined;
    }

    var dx = circVelX/100;
    var dy = circVelY/100;

    if(absX < width/2) {
        if(Math.abs(y+dy) > absY) {
            return undefined;
        }
        return {velX: circVelX, velY: -circVelY};
    }
    else if(absY < height/2) {
        if(Math.abs(x+dx) > absX) {
            return undefined;
        }
        return {velX: -circVelX, velY: circVelY};
    }
    else if(util.square(absX - width/2) + util.square(absY - height/2) > util.square(radius)) {
        return undefined;
    }

    if(x > y) {
        return {velX: -circVelX, velY: circVelY};
    }
    else{
        return {velX: circVelX, velY: -circVelY};
    }
},


// PUBLIC METHODS

clear: function() {
    this._nextSpatialID = 1;
    this._entities = [];
},

getNewSpatialID : function() {
    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
},

//bullet -> ball
findEntityInRange: function(posX, posY) {
    for (var ID in this._entities) {
        var entity = this._entities[ID];
        var cx = entity.cx;
        var cy = entity.cy;
        var rad = entity.getRadius();
        var distanceSq = util.distSq(cx,cy,posX,posY);
        var limitSq = util.square(rad);
        if(distanceSq < limitSq) return entity;
        if(cy - rad>=posY){
            if(Math.abs(cx-posX) < rad){
                return entity;
            }
        }
    }
},

//Bullet -> wall
findWallInRange: function(x,y){
    for(var ID in this._entities){
        var entity = this._entities[ID];
        var cy = entity.y;
        
        if(cy !== undefined) {
            var cx = entity.x;
            var width = entity.width || 0;
            var height = entity.height || 0;
            console.log(entity);
            if(cx === undefined) {
                // Converting ceiling coords into wall coords.
                cx = entity.minX;
                width = entity.maxX - cx;
                height = cy;
                cy = 0;
                
            }
                        
            if(x > cx && x < cx+width &&  y <= (cy + height) && cy !== 500){
                return entity;    
            }    
        }
    }
},

// Ball -> Wall
ballCollidesWithWall: function(cx, cy, radius, velX, velY) {
    for(var ID in this._entities) {
        // Start by shifting the center of the rectangle to the origin, and 'untilt' the rectangle.
        // Adjust the circle coordinates accordingly.
        var entity = this._entities[ID];
        var width = entity.width;
        var height = entity.height;
        var rectX = entity.x;
        var rectY = entity.y;
        if(width !== undefined && height !== undefined && rectX !== undefined && rectY !== undefined) {
            var direction = this._circAndRectCollision(cx, cy, radius, velX, velY, rectX, rectY, width, height);
            if(direction) {
                return direction;
            }
        } 
    }
    return {velX: velX, velY: velY};
},

ballCollidesWithCeiling: function(cx, cy, radius) {
    for(var ID in this._entities) {
        var entity = this._entities[ID];
        var minX = entity.minX;
        var maxX = entity.maxX;
        if(minX !== undefined && maxX !== undefined) {
            if(minX <= cx && cx <= maxX && cy - radius < entity.bottom) {
                return true;
            }
        }
    }
    return false;
},

wallInRangeOfMC: function(posX, posY, radius) {
    for(var ID in this._entities) {
        var entity = this._entities[ID];
        var width = entity.width;
        var height = entity.height;
        var rectX = entity.x;
        var rectY = entity.y;
        if(width !== undefined && height !== undefined && rectX !== undefined && rectY !== undefined) {
            var isInHeightRange = ((posY - radius > rectY) && (posY - radius < rectY + height)) 
                                || ((posY + radius > rectY) && (posY + radius < rectY + height));
            if(isInHeightRange) {
                var isInWall = ((posX - radius < rectX + width) && (posX - radius > rectX)) 
                            ||((posX + radius < rectX + width) && (posX + radius > rectX));

                if(isInWall) {
                    return true;
                }
            }
        } 
    }
    return false;
},

ballInRangeOfMC: function(posX,posY,radius){
    for (var ID in this._entities) {
      var entity = this._entities[ID];
      var cx = entity.cx;
      var cy = entity.cy;
      var rad = entity.getRadius();
      var distanceSq = util.distSq(cx, cy, posX, posY);
      var limitSq = util.square(rad + radius);
      if (distanceSq < limitSq) {return entity;}
    }
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.getPos().posX, e.getPos().posY, e.getRadius());
    }
    ctx.strokeStyle = oldStyle;
}

}
