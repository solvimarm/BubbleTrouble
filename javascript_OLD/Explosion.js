// ======
// Explosion
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Explosion(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
 this.sprite = this.sprite || g_sprites.explosion[0];
 this.scale = this.scale || 1;
}

Explosion.prototype = new Entity();

Explosion.prototype.getRadius = function(){
  return 0;
}

Explosion.prototype.spriteRenderer = {
  explosion:{
    renderTimes : 2,
    id:0,
    count:0
  }
};
Explosion.prototype.updateSprite = function(du){
  var expl = this.spriteRenderer.explosion;
  this.sprite = g_sprites.explosion[expl.id];
  if(expl.count >= g_sprites.explosion.length * expl.renderTimes){
    expl.id = 0;
    expl.count = 0;
    this.kill();
  }
  else{
    expl.id = Math.floor(expl.count / expl.renderTimes);
    expl.count += Math.round(du) || 1;
  }
}

Explosion.prototype.update = function(du){
  spatialManager.unregister(this);
  
  if(this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  var oldx = this.cx,
      oldy = this.cy;
  spatialManager.register(this);
  this.updateSprite(du);
  
}

Explosion.prototype.render = function(ctx){
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy);
}