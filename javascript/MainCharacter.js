// ====================
// Main Character Stuff
// ====================


function MainCharacter(descr){
    this.setup(descr);

    this.sprite = this.sprite || g_sprites.mainCharacterRight[0];
    this.scale = this.scale || 1;

}

MainCharacter.prototype = new Entity();

MainCharacter.prototype.KEY_LEFT = "A".charCodeAt(0);
MainCharacter.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
MainCharacter.prototype.KEY_FIRE   = ' '.charCodeAt(0);

MainCharacter.prototype.spriteRenderer = {
    movementRight:{
        renderTimes : 8,
        id :0,
        count: 0
    },
    movementLeft:{
        renderTimes: 8,
        id: 0,
        count:0
    }
};


MainCharacter.prototype.updateSprite = function(du, oldX, oldY) {
    var left = false;
    var right = false;
    var still = false;

    var runRight = this.spriteRenderer.movementRight;
    var runLeft = this.spriteRenderer.movementLeft;
    
    if(oldX < this.cx){
        left = false;
        right = true;
        still = false;
    }
    else if(oldX > this.cx){
        left = true;
        right = false;
        still = false;
    }
    else{
        left = false;
        right = false;
        still = true;
    }
    if(right)
        this.sprite = g_sprites.mainCharacterRight[runRight.id];
    else if(left) 
        this.sprite = g_sprites.mainCharacterLeft[runLeft.id];
    else if(still)
        this.sprite = g_sprites.mainCharacterStill;
    if (still || runRight.count >= g_sprites.mainCharacterRight.length * runRight.renderTimes || 
        runLeft.count >= g_sprites.mainCharacterLeft.length * runLeft.renderTimes) {
      runRight.id = 0;
      runRight.count = 0;
      runLeft.id = 0;
      runLeft.count = 0;
    } else if (right) {
      runRight.id = Math.floor(runRight.count / runRight.renderTimes);
      runRight.count += Math.round(du) || 1;
    } else if(left){
        runLeft.id = Math.floor(runLeft.count / runLeft.renderTimes);
        runLeft.count += Math.round(du) || 1;
    }

};

MainCharacter.prototype.update = function(du) {
  spatialManager.unregister(this);

  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  var oldx = this.cx,
    oldy = this.cy;
    if (keys[this.KEY_LEFT] && this.cx-16 > 0) this.cx=util.mod(this.cx - 5, g_canvas.width);
    if (keys[this.KEY_RIGHT] && this.cx < g_canvas.width - 16)  this.cx=util.mod(this.cx + 5, g_canvas.width);
    this.updateSprite(du, oldx, oldy);
  spatialManager.register(this);
  this.maybeFireBullet();
};

MainCharacter.prototype.maybeFireBullet = function () {

    if (eatKey(this.KEY_FIRE)) {
        console.log(this.cy)
        entityManager.fireBullet(this.cx - 100, this.cy);
    }
};

MainCharacter.prototype.render = function(ctx){
    this.sprite.drawWrappedCentredAt(ctx,this.cx,this.cy,this.rotation);
}