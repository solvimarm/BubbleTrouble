// ====================
// Main Character Stuff
// ====================


function MainCharacter(descr){
    this.setup(descr);

    this.sprite = this.sprite || g_sprites.mainCharacter[1];
    this.scale = this.scale || 1;
    console.log(this.sprite);

}

MainCharacter.prototype = new Entity();

MainCharacter.prototype.KEY_LEFT = "A".charCodeAt(0);
MainCharacter.prototype.KEY_RIGHT = 'D'.charCodeAt(0);

MainCharacter.prototype.spriteRenderer = {
    movement:{
        renderTimes : 2,
        id :0,
        count: 0
    }
};

MainCharacter.prototype.updateSprite = function(du) {
  var expl = this.spriteRenderer.movement;
  this.sprite = g_sprites.mainCharacter[0];
  if (expl.count >= g_sprites.mainCharacter.length * expl.renderTimes) {
    expl.id = 0;
    expl.count = 0;
   // this.kill();
  } else {
    expl.id = Math.floor(expl.count / expl.renderTimes);
    expl.count += Math.round(du) || 1;
  }
};

MainCharacter.prototype.update = function(du) {
  spatialManager.unregister(this);

  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  var oldx = this.cx,
    oldy = this.cy;
  spatialManager.register(this);
  this.updateSprite(du);
  if(keys[this.KEY_LEFT]) this.cx = util.mod(this.cx - 5, g_canvas.width);
  if(keys[this.KEY_RIGHT]) this.cx = util.mod(this.cx + 5, g_canvas.width);
};

MainCharacter.prototype.render = function(ctx){
    this.sprite.drawWrappedCentredAt(ctx,this.cx,this.cy,this.rotation);
}