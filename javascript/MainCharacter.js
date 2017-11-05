// ====================
// Main Character Stuff
// ====================


function MainCharacter(descr) {
    this.setup(descr);

    this.sprite = this.sprite || g_sprites.mainCharacterStill[0];
    this.scale = this.scale || 1;
    this.radius = 14;
    console.log(this.sprite);
}

MainCharacter.prototype = new Entity();

MainCharacter.prototype.KEY_LEFT = "A".charCodeAt(0);
MainCharacter.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
MainCharacter.prototype.KEY_FIRE = ' '.charCodeAt(0);

MainCharacter.prototype.spriteRenderer = {
    movementRight: {
        renderTimes: 8,
        id: 0,
        count: 0
    },
    movementLeft: {
        renderTimes: 8,
        id: 0,
        count: 0
    }
};


MainCharacter.prototype.updateSprite = function (du, oldX, oldY) {
    var left = false;
    var right = false;
    var still = false;

    var runRight = this.spriteRenderer.movementRight;
    var runLeft = this.spriteRenderer.movementLeft;

    if (oldX < this.cx) {
        left = false;
        right = true;
        still = false;
    } else if (oldX > this.cx) {
        left = true;
        right = false;
        still = false;
    } else {
        left = false;
        right = false;
        still = true;
    }
    if (right) {
        
      if (characterChosen === 0) this.sprite = g_sprites.mainCharacter[runRight.id];
      if (characterChosen === 1) {
        this.sprite = g_sprites.mainCharacter[runRight.id + 4];
      }
      if (characterChosen === 2) this.sprite = g_sprites.mainCharacter[runRight.id + 8];
      if (characterChosen === 3) this.sprite = g_sprites.mainCharacter[runRight.id + 12];
    } else if (left) {
      if (characterChosen === 0) this.sprite = g_sprites.mainCharacterLeft[runLeft.id];
      if (characterChosen === 1) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 4];
      if (characterChosen === 2) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 8];
      if (characterChosen === 3) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 12];
    } else if (still) this.sprite = g_sprites.mainCharacterStill[characterChosen];
    if (still || runRight.count >= /*g_sprites.mainCharacterRight.length*/ 4 * runRight.renderTimes ||
        runLeft.count >= /*g_sprites.mainCharacterLeft.length*/ 4 * runLeft.renderTimes) {
        runRight.id = 0;
        runRight.count = 0;
        runLeft.id = 0;
        runLeft.count = 0;
    } else if (right) {
        runRight.id = Math.floor(runRight.count / runRight.renderTimes);
        runRight.count += Math.round(du) || 1;
    } else if (left) {
        runLeft.id = Math.floor(runLeft.count / runLeft.renderTimes);
        runLeft.count += Math.round(du) || 1;
    }

};

MainCharacter.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    var collEntity = this.findBallEntity();
    if (collEntity) return entityManager.KILL_ME_NOW


    var oldx = this.cx,
        oldy = this.cy;
    if (keys[this.KEY_LEFT] && this.cx - 16 > 0) this.cx = util.mod(this.cx - 3, g_canvas.width);
    if (keys[this.KEY_RIGHT] && this.cx < g_canvas.width - 16) this.cx = util.mod(this.cx + 3, g_canvas.width);
    this.updateSprite(du, oldx, oldy);
    spatialManager.register(this);
    this.maybeFireBullet();
};

MainCharacter.prototype.maybeFireBullet = function () {

    if (eatKey(this.KEY_FIRE) && entityManager._bullet.length === 0) {
        console.log(this.cy)
        entityManager.fireBullet(this.cx, this.cy + this.sprite.height / 2, this.bulletType);
    }
};

MainCharacter.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
}

MainCharacter.prototype.getRad = function () {
    return this.radius;
}