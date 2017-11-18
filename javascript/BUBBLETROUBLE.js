// ==============
// BUBBLE TROUBLE
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var state = {
  startGame : false
};

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
  // Nothing to do here!
  // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  processDiagnostics();

  if (state.startGame){
    entityManager.update(du);
  }

  // Prevent perpetual firing!
}

// GAME-SPECIFIC DIAGNOSTICS

//var g_allowMixedActions = true;
//var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
//var g_useExpl = false;

//var KEY_MIXED = keyCode("M");
//var KEY_GRAVITY = keyCode("G");
//var KEY_AVE_VEL = keyCode("V");
var KEY_SPATIAL = keyCode("X");

//var KEY_HALT = keyCode("H");
//var KEY_RESET = keyCode("R");

//var KEY_0 = keyCode("0");

//var KEY_1 = keyCode("1");
//var KEY_2 = keyCode("2");

//var KEY_K = keyCode("K");

//var KEY_EXPL = keyCode("E");

function processDiagnostics() {
  //if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

  //if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

  //if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

  if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
}
// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`

// GAME-SPECIFIC RENDERING
function renderSimulation(ctx) {
  if (state.startGame)
    entityManager.render(ctx);
  if (!state.startGame) drawStartScreen(ctx);
  if (g_renderSpatialDebug && state.startGame) spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {
  var requiredImages = {
    // Characters
    Chick: "Sprites/Characters/Chick.png",
    Anotherdevil: "Sprites/Characters/Anotherdevil.png",
    Deathnote: "Sprites/Characters/Deathnote.png",
    Golbez: "Sprites/Characters/Golbez.png",
    Devil: "Sprites/Characters/Devil.png",
    // Backgrounds
    Background_1: "Sprites/Backgrounds/Back_1.jpg",
    Background_2: "Sprites/Backgrounds/Back_2.jpg",
    Background_3: "Sprites/Backgrounds/Back_3.jpg",
    Background_4: "Sprites/Backgrounds/Back_4.jpg",
    Background_5: "Sprites/Backgrounds/Back_5.jpg",
    Background_6: "Sprites/Backgrounds/Back_6.jpg",
    // Bullets
    Bullet_1: "Sprites/Bullets/Bullet_1.png",
    Bullet_2: "Sprites/Bullets/Bullet_2.png",
    Bullet_3: "Sprites/Bullets/Bullet_3.png",
    Bullet_4: "Sprites/Bullets/Bullet_4.png",
    Bullet_5: "Sprites/Bullets/Bullet_5.png",
    // Walls
    Wall_ground: "Sprites/Walls/Wall_Ground.png",
    Wall_Stone1: "Sprites/Walls/Wall_Stone1.png",
    Wall_Stone2: "Sprites/Walls/Wall_Stone2.png",
    Wall_Steel: "Sprites/Walls/Wall_Steel.png",
    Wall_Wood: "Sprites/Walls/Wall_Wood.png",
    // Balls - There are 17 balls exist.
    Ball_Blue1: "Sprites/Balls/Ball_Blue1.png",             // 1
    Ball_Blue2: "Sprites/Balls/Ball_Blue2.png",             // 2
    Ball_Brown1: "Sprites/Balls/Ball_Brown1.png",           // 3
    Ball_Brown2: "Sprites/Balls/Ball_Brown2.png",           // 4
    Ball_Green: "Sprites/Balls/Ball_Green.png",             // 5
    Ball_GreenBlue: "Sprites/Balls/Ball_GreenBlue.png",     // 6
    Ball_Grey: "Sprites/Balls/Ball_Grey.png",               // 7
    Ball_LightBlue: "Sprites/Balls/Ball_LightBlue.png",     // 8
    Ball_LightGreen: "Sprites/Balls/Ball_LightGreen.png",   // 9
    Ball_Orange: "Sprites/Balls/Ball_Orange.png",           // 10
    Ball_Pink: "Sprites/Balls/Ball_Pink.png",               // 11
    Ball_Purple: "Sprites/Balls/Ball_Purple.png",           // 12
    Ball_Red: "Sprites/Balls/Ball_Red.png",                 // 13
    Ball_SeaGreen: "Sprites/Balls/Ball_SeaGreen.png",       // 14
    Ball_WineRed: "Sprites/Balls/Ball_WineRed.png",         // 15
    Ball_Yellow1: "Sprites/Balls/Ball_Yellow1.png",         // 16
    Ball_Yellow2: "Sprites/Balls/Ball_Yellow2.png",         // 17
    // PowerUps
    Power_LiveRedHeart: "Sprites/PowerUps/Live_RedHeart.png",
    Power_hourglass: "Sprites/PowerUps/hour_glass.png",
    Power_chain: "Sprites/PowerUps/power_chain.png",
    Power_shield: "Sprites/PowerUps/shield.png",
    Power_characterShield: "Sprites/PowerUps/character_shield.png",
    // StartScreen icon
    Chick_Color: "Sprites/StartScreen/Chick_Color.png",
    AnotherdevilBW: "Sprites/StartScreen/Anotherdevil_BW.png",
    Anotherdevil_Color: "Sprites/StartScreen/Anotherdevil_Color.png",
    Chick_BW: "Sprites/StartScreen/Chick_BW.png",
    Deathnote_BW: "Sprites/StartScreen/Deathnote_BW.png",
    Deathnote_Color: "Sprites/StartScreen/Deathnote_Color.png",
    Golbez_BW: "Sprites/StartScreen/Golbez_BW.png",
    Golbez_Color: "Sprites/StartScreen/Golbez_Color.png",
    Devil_BW : "Sprites/StartScreen/Devil_BW.png",
    Devil_Color: "Sprites/StartScreen/Devil_Color.png",
    Logo : "Sprites/StartScreen/BubbleTroubble_Logo.png",
    Play: "Sprites/StartScreen/Play.png",
    Wall_Background: "Sprites/StartScreen/Wall_Start.jpg",
    ChooseC : "Sprites/StartScreen/ChooseC.png",
    Info : "Sprites/StartScreen/Info.png",
    // numbers
    Number_1: "Sprites/Numbers/number_1.png",
    Number_2: "Sprites/Numbers/number_2.png",
    Number_3: "Sprites/Numbers/number_3.png"
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
  // Characters
  g_sprites.mainCharacter = [
    new Sprite(g_images.Chick, 0, 104, 32, 52),
    new Sprite(g_images.Chick, 32, 104, 32, 52),
    new Sprite(g_images.Chick, 64, 104, 32, 52),
    new Sprite(g_images.Chick, 96, 104, 32, 52),

    new Sprite(g_images.Anotherdevil, 0, 96, 32, 48),
    new Sprite(g_images.Anotherdevil, 32, 96, 32, 48),
    new Sprite(g_images.Anotherdevil, 64, 96, 32, 48),
    new Sprite(g_images.Anotherdevil, 96, 96, 32, 48),

    new Sprite(g_images.Deathnote, 0, 96, 36, 48),
    new Sprite(g_images.Deathnote, 36, 96, 36, 48),
    new Sprite(g_images.Deathnote, 72, 96, 36, 48),
    new Sprite(g_images.Deathnote, 108, 96, 36, 48),

    new Sprite(g_images.Golbez, 0, 96, 32, 48),
    new Sprite(g_images.Golbez, 32, 96, 32, 48),
    new Sprite(g_images.Golbez, 64, 96, 32, 48),
    new Sprite(g_images.Golbez, 96, 96, 32, 48),

    new Sprite(g_images.Devil,   0, 134, 67, 67),
    new Sprite(g_images.Devil,  67, 134, 67, 67),
    new Sprite(g_images.Devil, 134, 134, 67, 67),
    new Sprite(g_images.Devil, 201, 134, 67, 67) 
  ];

  g_sprites.mainCharacterLeft = [
    new Sprite(g_images.Chick, 96, 52, 32, 52),
    new Sprite(g_images.Chick, 64, 52, 32, 52),
    new Sprite(g_images.Chick, 32, 52, 32, 52),
    new Sprite(g_images.Chick, 0, 52, 32, 52),

    new Sprite(g_images.Anotherdevil, 96, 48, 32, 48),
    new Sprite(g_images.Anotherdevil, 64, 48, 32, 48),
    new Sprite(g_images.Anotherdevil, 32, 48, 32, 48),
    new Sprite(g_images.Anotherdevil, 0, 48, 32, 48),

    new Sprite(g_images.Deathnote, 108, 48, 36, 48),
    new Sprite(g_images.Deathnote, 72, 48, 36, 48),
    new Sprite(g_images.Deathnote, 36, 48, 36, 48),
    new Sprite(g_images.Deathnote, 0, 48, 36, 48),

    new Sprite(g_images.Golbez, 96, 46, 32, 48),
    new Sprite(g_images.Golbez, 64, 46, 32, 48),
    new Sprite(g_images.Golbez, 32, 46, 32, 48),
    new Sprite(g_images.Golbez, 0, 46, 32, 48),

    new Sprite(g_images.Devil, 201, 67, 67, 67),
    new Sprite(g_images.Devil, 134, 67, 67, 67),
    new Sprite(g_images.Devil,  67, 67, 67, 67),
    new Sprite(g_images.Devil,   0, 67, 67, 67)    
  ];

  g_sprites.mainCharacterStill = [
    new Sprite(g_images.Chick, 0, 0, 32, 52),
    new Sprite(g_images.Anotherdevil, 0, 0, 32, 48),
    new Sprite(g_images.Deathnote, 0, 0, 36, 48),
    new Sprite(g_images.Golbez, 0, 0, 32, 48),
    new Sprite(g_images.Devil, 0, 0, 67, 67)
  ];

  // Backgrounds
  g_sprites.background = [new Sprite(g_images.Background_1),
    new Sprite(g_images.Background_2),
    new Sprite(g_images.Background_3),
    new Sprite(g_images.Background_4),
    new Sprite(g_images.Background_5),
    new Sprite(g_images.Background_6)
  ];

  // Bullets
  g_sprites.bullet = [new Sprite(g_images.Bullet_1),
    new Sprite(g_images.Bullet_2),
    new Sprite(g_images.Bullet_3),
    new Sprite(g_images.Bullet_4),
    new Sprite(g_images.Bullet_5)
  ];

  // Walls
  g_sprites.wall_ground = new Sprite(g_images.Wall_ground);
  g_sprites.wall_Stone1 = new Sprite(g_images.Wall_Stone1);
  g_sprites.wall_Stone2 = new Sprite(g_images.Wall_Stone2);
  g_sprites.wall_Steel = new Sprite(g_images.Wall_Steel);
  g_sprites.wall_Wood = new Sprite(g_images.Wall_Wood);
  // numbers
  g_sprites.Number_1 = new Sprite(g_images.Number_1);
  g_sprites.Number_2 = new Sprite(g_images.Number_2);
  g_sprites.Number_3 = new Sprite(g_images.Number_3);

  // Balls - There are 17 balls.
  g_sprites.Ball = {
    "Blue1": new Sprite(g_images.Ball_Blue1),
    "Blue2": new Sprite(g_images.Ball_Blue1),
    "Brown1": new Sprite(g_images.Ball_Brown1),
    "Brown2": new Sprite(g_images.Ball_Brown2),
    "Green": new Sprite(g_images.Ball_Green),
    "GreenBlue": new Sprite(g_images.Ball_GreenBlue),
    "Grey": new Sprite(g_images.Ball_Grey),
    "LightBlue": new Sprite(g_images.Ball_LightBlue),
    "LightGreen": new Sprite(g_images.Ball_Green),
    "Orange": new Sprite(g_images.Ball_Orange),
    "Pink": new Sprite(g_images.Ball_Pink),
    "Purple": new Sprite(g_images.Ball_Purple),
    "Red": new Sprite(g_images.Ball_Red),
    "SeaGreen": new Sprite(g_images.Ball_SeaGreen),
    "WineRed": new Sprite(g_images.Ball_WineRed),
    "Yellow1": new Sprite(g_images.Ball_Yellow1),
    "Yellow2": new Sprite(g_images.Ball_Yellow2)
  };


  // PowerUps
  g_sprites.Power_LiveRedHeart = new Sprite(g_images.Power_LiveRedHeart);
  g_sprites.Power_hourglass = new Sprite(g_images.Power_hourglass);
  g_sprites.Power_chain = new Sprite(g_images.Power_chain);
  g_sprites.Power_shield = new Sprite(g_images.Power_shield);
  g_sprites.Power_characterShield = new Sprite(g_images.Power_characterShield);

  main.init();
}

// Kick it off
requestPreloads();
Start_Song.play();


var playX = 100;
var playY = 100;
var cheight = 365 // Character height

function st_screen(x, y) {
  if (x > 80 - g_images.Chick_BW.width / 2 && x < 80 + g_images.Chick_BW.width / 2) {
    if (y > cheight - g_images.Chick_BW.height / 2 && y < cheight + g_images.Chick_BW.height / 2) {
      characterChosen = 0;
    }
  }
  if (x > 240 - g_images.AnotherdevilBW.width / 2 && x < 240 + g_images.AnotherdevilBW.width / 2) {
    if (y > cheight - g_images.AnotherdevilBW.height / 2 && y < cheight + g_images.AnotherdevilBW.height / 2) {
      characterChosen = 1;
      g_LIVES = 2;
    }
  }
  if (x > 400 - g_images.Deathnote_BW.width / 2 && x < 400 + g_images.Deathnote_BW.width / 2) {
    if (y > cheight - g_images.Deathnote_BW.height / 2 && y < cheight + g_images.Deathnote_BW.height / 2) {
      characterChosen = 2;
    }
  }
  if (x > 560 - g_images.Golbez_BW.width / 2 && x < 560 + g_images.Golbez_BW.width / 2) {
    if (y > cheight - g_images.Golbez_BW.height / 2 && y < cheight + g_images.Golbez_BW.height / 2) {
      characterChosen = 3;
    }
  }
  if (x > 720 - g_images.Devil_BW.width / 2 && x < 720 + g_images.Devil_BW.width / 2) {
    if (y > cheight - g_images.Devil_BW.height / 2 && y < cheight + g_images.Devil_BW.height / 2) {
      characterChosen = 4;
      g_LIVES = 5;
    }
  }
  if (x > 680 && x < 680 + g_images.Play.width) {
    if (y > 480 && y < 480 + g_images.Play.height) {
      state.startGame = true;
      Start_Song.pause();
      Play_Song.load();
      Play_Song.play();
      //g_LIVES = 3;
      generateMap(0);
    }
  }
}

function drawStartScreen(ctx) {
  ctx.drawImage(g_images.Wall_Background, 0, 0);
  ctx.drawImage(g_images.Logo, 0, 0);
  ctx.drawImage(g_images.Play, 680, 480);
  ctx.drawImage(g_images.ChooseC, 40, 310);
  ctx.drawImage(g_images.Info, 40, 435);

  switch (characterChosen) {
    case 0:
      drawChick(ctx);
      break;
    case 1:
      drawAnotherDevil(ctx);
      break;
    case 2:
      drawDeathnote(ctx);
      break;
    case 3:
      drawGolbez(ctx);
      break;
    case 4:
      drawDevil(ctx);
      break;
  }
}

function drawChick(ctx) {
  drawGhosts(ctx);
  drawCharacter(ctx, 80, cheight, 1.2, g_images.Chick_Color);
}

function drawAnotherDevil(ctx) {
  drawGhosts(ctx);
  drawCharacter(ctx, 240, cheight, 1.2, g_images.Anotherdevil_Color);
}

function drawDeathnote(ctx) {
  drawGhosts(ctx);
  drawCharacter(ctx, 400, cheight, 1.2, g_images.Deathnote_Color);
}

function drawGolbez(ctx) {
  drawGhosts(ctx);
  drawCharacter(ctx, 560, cheight, 1.2, g_images.Golbez_Color);
}
function drawDevil(ctx){
  drawGhosts(ctx);
  drawCharacter(ctx,720, cheight, 1.2, g_images.Devil_Color);
}

function drawGhosts(ctx) {
  drawCharacter(ctx,  80, cheight, 1, g_images.Chick_BW);
  drawCharacter(ctx, 240, cheight, 1, g_images.AnotherdevilBW);
  drawCharacter(ctx, 400, cheight, 1, g_images.Deathnote_BW);
  drawCharacter(ctx, 560, cheight, 1, g_images.Golbez_BW);
  drawCharacter(ctx, 720, cheight, 1, g_images.Devil_BW);
}

function drawCharacter(ctx, x, y, scale, image) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.drawImage(image, -image.width/2, -image.height/2);
  ctx.restore();
}