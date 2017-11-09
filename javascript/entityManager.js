"use strict";


var entityManager = {
  // "PRIVATE" DATA

  _mainCharacter: [],
  _ceilings: [],
  _wall: [],
  _bullet: [],
  _balls: [],
  _power:[],
  _background: [],
  _lives: [],
  // "PRIVATE" METHODS


  _forEachOf: function (aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!
  //
  KILL_ME_NOW: -1,

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function () {
    this._categories = [
      this._background,
      this._bullet,
      this._mainCharacter,
      this._ceilings,
      this._wall,
      this._power,
      this._balls,
      this._lives
    ];
  },

  clear: function() {
    spatialManager.clear();
    this._mainCharacter = [];
    this._ceilings = [];
    this._wall = [];
    this._bullet = [];
    this._balls = [];
    this._power = [];
    this._background = [];
    this._lives = [];
  },

  initiateLevel: function(map_number, numberOfBalls) {
    this._level = {
      "currentMap": map_number,
      "initialBalls": numberOfBalls,
      "ballsHit": 0
    };
  },

  ballHit: function() {
    this._level["ballsHit"]++;
    console.log("Total: " + this._level["initialBalls"] + ", so far: " + this._level["ballsHit"]);
    if(this._level["ballsHit"] === this._level["initialBalls"]) {
      generateMap( this._level["currentMap"]+1);
      //setTimeout(generateMap[ 3000, this._level["currentMap"]+1]);
      //generateMap(this._level["currentMap"]+1)
    }
  },

  generateCeiling: function (descr) {
    this._ceilings.push(new Ceiling(descr));
  },

  generateMainCharacter: function (descr) {
    this._mainCharacter.push(new MainCharacter(descr));
  },

  generateWall: function (descr) {
    this._wall.push(new Wall(descr));
  },

  generateBackground: function (descr) {
    this._background.push(new Background(descr));
  },

  fireBullet: function (cx, yTop, bulletType) {
    this._bullet.push(new Bullet({
      cx: cx,
      yTop: yTop,
      type: bulletType
    }));
  },

  generateBall: function (descr) {
    this._balls.push(new Ball(descr));
  },

  generateLives: function (num) {
    this._lives.push(new Lives({
      cx: 315,
      cy: 550 
    }));
  },
  
  CreatePower: function(cx, cy, power) {
      this._power.push(new Powerup({
        cx : cx,
        cy : cy,
        power: power
      }));
  },
  killBall: function (descr) {

  },
  update: function (du) {
    for (var c = 0; c < this._categories.length; ++c) {
      var aCategory = this._categories[c];
      var i = 0;

      while (i < aCategory.length) {
        var status = aCategory[i].update(du);

        if (status === this.KILL_ME_NOW) {
          // remove the dead guy, and shuffle the others down to
          // prevent a confusing gap from appearing in the array
          aCategory.splice(i, 1);
        } else {
          ++i;
        }
      }
    }

  },

  render: function (ctx) {
    var debugX = 10,
      debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {
      var aCategory = this._categories[c];

      if (!this._bShowRocks && aCategory == this._rocks) continue;

      for (var i = 0; i < aCategory.length; ++i) {
        aCategory[i].render(ctx);
        //debug.text(".", debugX + i * 10, debugY);
      }
      debugY += 10;
    }
  }
};

// Some deferred setup which needs the object to have been created first
//entityManager.deferredSetup();