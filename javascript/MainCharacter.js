// ====================
// Main Character Stuff
// ====================


function MainCharacter(descr) {
    this.setup(descr);

    //this.sprite = this.sprite //|| g_sprites.mainCharacterStill[0];
    this.scale = this.scale || 1;
    this.radius = 14;
    console.log(this.sprite);
    console.log("this character cx: " + this.cx + "and cy: " + this.cy);
}

MainCharacter.prototype = new Entity();

MainCharacter.prototype.KEY_LEFT = "A".charCodeAt(0);
MainCharacter.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
MainCharacter.prototype.KEY_FIRE = ' '.charCodeAt(0);
MainCharacter.prototype.SHIELD = false;
MainCharacter.prototype.CHAIN_BULLET = false;
var g_LIVES = 3;
var lifelost = true;
var shield_time = false;

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
      if (characterChosen === 1) this.sprite = g_sprites.mainCharacter[runRight.id + 4];
      if (characterChosen === 2) this.sprite = g_sprites.mainCharacter[runRight.id + 8];
      if (characterChosen === 3) this.sprite = g_sprites.mainCharacter[runRight.id + 12];
      if (characterChosen === 4) this.sprite = g_sprites.mainCharacter[runRight.id + 16];
    } else if (left) {
      if (characterChosen === 0) this.sprite = g_sprites.mainCharacterLeft[runLeft.id];
      if (characterChosen === 1) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 4];
      if (characterChosen === 2) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 8];
      if (characterChosen === 3) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 12];
      if (characterChosen === 4) this.sprite = g_sprites.mainCharacterLeft[runLeft.id + 16];
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
    if (collEntity){
        if(collEntity.power){
            this.getPowerup(collEntity.power);
            collEntity.alive = false;
        } 
        else if(this.SHIELD && !shield_time){
            shield_time = true
            setTimeout(shieldTimeout, 500);
            this.SHIELD = false;
        }
        else if(g_LIVES > 0 && lifelost && !shield_time){
            lifelost = false
            setTimeout(looseLife, 500);
            g_LIVES--;

        }
        else if(g_LIVES <= 0 && !shield_time){
            return entityManager.KILL_ME_NOW;
        }
    }

    var pos = this.getPos(); 
    if(spatialManager.ballCollidesWithCeiling(pos.posX,pos.posY,this.getRad())) {
        g_LIVES = 0;
    }

    var oldx = this.cx,
        oldy = this.cy;
    if (keys[this.KEY_LEFT] && this.cx - 16 > 0) this.cx = util.mod(this.cx - 3, g_canvas.width);
    if (keys[this.KEY_RIGHT] && this.cx < g_canvas.width - 16) this.cx = util.mod(this.cx + 3, g_canvas.width);
    this.updateSprite(du, oldx, oldy);
    spatialManager.register(this);
    this.maybeFireBullet();
};

MainCharacter.prototype.maybeFireBullet = function () {
    var bulletType = "default";
    if(this.CHAIN_BULLET){
        bulletType = "chain"
    }

    if (eatKey(this.KEY_FIRE) && entityManager._bullet.length === 0) {
        console.log(this.cy)
        entityManager.fireBullet(this.cx, this.cy + this.sprite.height / 2, bulletType);
    }
};

MainCharacter.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    if(this.SHIELD){
        g_sprites.Power_characterShield.drawWrappedCentredAt(ctx, this.cx, this.cy);
    }
}

MainCharacter.prototype.getRad = function () {
    return this.radius;
}

MainCharacter.prototype.getPowerup = function(power){
    if(power === "shield"){
        this.SHIELD = true;
    }
    if(power === "chain"){
        this.CHAIN_BULLET = true;
    }
    if(power === "extralife"){
        if(g_LIVES < 5) g_LIVES++;
    }
    if(power === "extratime"){
        return;
    }
};
function looseLife() {
    lifelost = true;
}
function shieldTimeout(){
    shield_time = false;
}

