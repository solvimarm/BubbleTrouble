// ====================
// Main Character Stuff
// ====================


function MainCharacter(descr) {
    this.setup(descr);

    //this.sprite = this.sprite //|| g_sprites.mainCharacterStill[0];
    this.scale = this.scale || 1;
    this.radius = 14;
    if(characterChosen === 3)
        this.SHIELD = true;
}

MainCharacter.prototype = new Entity();

MainCharacter.prototype.KEY_LEFT = "A".charCodeAt(0);
MainCharacter.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
MainCharacter.prototype.KEY_FIRE = ' '.charCodeAt(0);
MainCharacter.prototype.SHIELD = false;
MainCharacter.prototype.CHAIN_BULLET =  false;
var g_LIVES = 3;
var lifelost = true;
var shield_time = false;
var ShotCounter = 0;
var GameOver_sound = new Audio("Sounds/game_over.wav");
var PowerUps_sound = new Audio("Sounds/PowerUps.wav");
var Timesup_sound = new Audio("Sounds/TimesUp.wav");

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

    if (still || runRight.count >= 4 * runRight.renderTimes ||
        runLeft.count >= 4 * runLeft.renderTimes) {
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
    if(characterChosen === 1){
    }
    spatialManager.unregister(this);
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    var collEntity = this.findBallEntity();
    if (collEntity) {
        if (collEntity.power) {
            this.getPowerup(collEntity.power);
            PowerUps_sound.play();
            collEntity.alive = false;
        } else if (this.SHIELD && !shield_time) {
            shield_time = true;
            entityManager.addTimer(shieldTimeout, 0.5);
            this.SHIELD = false;
        } else if (g_LIVES > 0 && !shield_time) {
            this.kill();
        }
    }

    var pos = this.getPos();
    var radius = this.getRad();
    if (spatialManager.ballCollidesWithCeiling(pos.posX, pos.posY, radius)) {
        g_LIVES = 0;
    }

    var oldx = this.cx;

    if (keys[this.KEY_LEFT]) {
        if(characterChosen === 1)
            var nextX = this.cx - 4;
        else if(characterChosen === 4)
            var nextX = this.cx - 2;
        else 
            var nextX = this.cx - 3;
        var isCollidingWithWall = spatialManager.wallInRangeOfMC(nextX, pos.posY, radius);
        if (!isCollidingWithWall) {
             this.cx = util.mod(nextX, g_canvas.width);
        }
    }
    if (keys[this.KEY_RIGHT]) {
        if(characterChosen === 1)
            var nextX = this.cx + 4;
        else if(characterChosen === 4)
            var nextX = this.cx + 2;
        else
            var nextX = this.cx + 3;
        var isCollidingWithWall = spatialManager.wallInRangeOfMC(nextX, pos.posY, radius);
        if (!isCollidingWithWall) {
            this.cx = util.mod(nextX, g_canvas.width);
        }
    }

    this.updateSprite(du, oldx, this.cy);
    spatialManager.register(this);
    this.maybeFireBullet();
};

MainCharacter.prototype.maybeFireBullet = function () {
    var bulletType = "default";
    if (this.CHAIN_BULLET) {
        bulletType = "chain"
    }
    
    if (eatKey(this.KEY_FIRE) && (entityManager._bullet.length === 0 || (entityManager._bullet.length === 1 && characterChosen === 2))) {
        entityManager.fireBullet(this.cx, this.cy + this.sprite.height / 2, bulletType);
        ShotCounter = 1;
    }
    /*
    if(eatKey(this.KEY_FIRE) && ShotCounter === 1 ){
        entityManager.fireBullet(this.cx, this.cy + this.sprite.height / 2, bulletType);
        ShotCounter = 0;
        console.log("object");
    }
    console.log(ShotCounter + "   " + characterChosen);
    */
};

MainCharacter.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
    if (this.SHIELD) {
        g_sprites.Power_characterShield.drawWrappedCentredAt(ctx, this.cx, this.cy);
    }
}

MainCharacter.prototype.kill = function () {
    // Eitt líf fjarlægt eftir Timesup_sound.
    if (g_LIVES <= 1) { // Ef síðasta lífið er að fara: 
        GAME_FREEZE = true;
        entityManager.addTimer(function () {
            gameOver();
        }, 4);
        Play_Song.pause();
        GameOver_sound.play();
    } else {
        lifelost = false;
        GAME_FREEZE = true;
        Play_Song.pause();
        Timesup_sound.play();
        entityManager.addTimer(function () {
            next();
        }, 4.6);
    }
}

MainCharacter.prototype.getRad = function () {
    return this.radius;
}

MainCharacter.prototype.getPowerup = function (power) {
    if (power === "shield" && characterChosen != 2) {
        this.SHIELD = true;
    }
    if (power === "chain") {
        this.CHAIN_BULLET = true;
    }
    if (power === "extralife") {
        if (g_LIVES < 5) g_LIVES++;
    }
    if (power === "extratime") {
        FREEZE = true;
        entityManager.addTimer(function () {
            FREEZE = false;
        }, 4);
    }
};

function shieldTimeout() {
    shield_time = false;
}

function gameOver() {
    console.log("Game over");
    GAME_FREEZE = false;
    state.startGame = false;
    entityManager.clear();
    Start_Song.load();
    Start_Song.play();
}

function next() {
    g_LIVES--;
    GAME_FREEZE = false;
    entityManager.resetLevel();
    Play_Song.play();
    return entityManager.KILL_ME_NOW;
}