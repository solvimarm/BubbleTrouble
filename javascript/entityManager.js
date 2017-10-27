

"use strict";


var entityManager = {
  // "PRIVATE" DATA

    _mainCharacter : [],
    _ceilings: [],
    _bullet: [],
  // "PRIVATE" METHODS



  _forEachOf: function(aCategory, fn) {
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
  deferredSetup: function() {
    this._categories = [
      this._bullet,
      this._mainCharacter, 
      this._ceilings
    ];
  },

  generateCeiling: function(descr) {
    this._ceilings.push(new Ceiling(descr));
  },

  generateMainCharacter : function(descr){
      this._mainCharacter.push(new MainCharacter(descr))
  },
fireBullet: function(cx, cy) {
    this._bullet.push(new Bullet({
        cx   : cx,
        cy   : cy,
    }));
},

  update: function(du) {
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

  render: function(ctx) {
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
entityManager.deferredSetup();
