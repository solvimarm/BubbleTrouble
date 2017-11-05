// ==============
// BUBBLE TROUBLE
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var state = [
  startGame = false
];

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

  if (state.startGame)
    entityManager.update(du);

  // Prevent perpetual firing!
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_useExpl = false;

var KEY_MIXED = keyCode("M");
var KEY_GRAVITY = keyCode("G");
var KEY_AVE_VEL = keyCode("V");
var KEY_SPATIAL = keyCode("X");

var KEY_HALT = keyCode("H");
var KEY_RESET = keyCode("R");

var KEY_0 = keyCode("0");

var KEY_1 = keyCode("1");
var KEY_2 = keyCode("2");

var KEY_K = keyCode("K");

var KEY_EXPL = keyCode("E");

function processDiagnostics() {
  if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

  if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

  if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

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
    Chick:        "Sprites/Characters/Chick.png",
    Anotherdevil: "Sprites/Characters/Anotherdevil.png",
    Deathnote:    "Sprites/Characters/Deathnote.png",
    Golbez:       "Sprites/Characters/Golbez.png",
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
    // StartScreen icon
    Chick_Color:        "sprites/StartScreen/Chick_Color.png",
    AnotherdevilBW:     "sprites/StartScreen/Anotherdevil_BW.png",
    Anotherdevil_Color: "sprites/StartScreen/Anotherdevil_Color.png",
    Chick_BW:           "sprites/StartScreen/Chick_BW.png",
    Deathnote_BW:       "sprites/StartScreen/Deathnote_BW.png",
    Deathnote_Color:    "sprites/StartScreen/Deathnote_Color.png",
    Golbez_BW:          "sprites/StartScreen/Golbez_BW.png",
    Golbez_Color:       "sprites/StartScreen/Golbez_Color.png"
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
  // Characters
   g_sprites.mainCharacterRight = [
     new Sprite(g_images.Chick, 0, 104, 32, 52),
     new Sprite(g_images.Chick, 32, 104, 32, 52),
     new Sprite(g_images.Chick, 64, 104, 32, 52),
     new Sprite(g_images.Chick, 96, 104, 32, 52),

     new Sprite(g_images.Anotherdevil, 0, 96, 32, 48),
     new Sprite(g_images.Anotherdevil, 32, 96, 32, 48),
     new Sprite(g_images.Anotherdevil, 64, 96, 32, 48),
     new Sprite(g_images.Anotherdevil, 96, 96, 32, 48),

     new Sprite(g_images.Deathnote, 0, 128, 48, 64),
     new Sprite(g_images.Deathnote, 48, 128, 48, 64),
     new Sprite(g_images.Deathnote, 96, 128, 48, 64),
     new Sprite(g_images.Deathnote, 144, 128, 48, 64),

     new Sprite(g_images.Golbez, 0, 96, 32, 50),
     new Sprite(g_images.Golbez, 32, 96, 32, 50),
     new Sprite(g_images.Golbez, 64, 96, 32, 50),
     new Sprite(g_images.Golbez, 96, 96, 32, 50)
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

     new Sprite(g_images.Deathnote, 144, 64, 48, 64),
     new Sprite(g_images.Deathnote, 96, 64, 48, 64),
     new Sprite(g_images.Deathnote, 48, 64, 48, 64),
     new Sprite(g_images.Deathnote, 0, 64, 48, 64),

     new Sprite(g_images.Golbez, 96, 46, 32, 50),
     new Sprite(g_images.Golbez, 64, 46, 32, 50),
     new Sprite(g_images.Golbez, 32, 46, 32, 50),
     new Sprite(g_images.Golbez, 0, 46, 32, 50)
   ];

   g_sprites.mainCharacterStill = [
     new Sprite(g_images.Chick, 0, 0, 32, 52),
     new Sprite(g_images.Anotherdevil, 0, 0, 32, 48),
     new Sprite(g_images.Deathnote, 0, 0, 48, 64),
     new Sprite(g_images.Golbez, 0, 0, 32, 50)
   ];

  // Backgrounds
  g_sprites.background_1 = new Sprite(g_images.Background_1);
  g_sprites.background_2 = new Sprite(g_images.Background_2);
  g_sprites.background_3 = new Sprite(g_images.Background_3);
  g_sprites.background_4 = new Sprite(g_images.Background_4);
  g_sprites.background_5 = new Sprite(g_images.Background_5);
  g_sprites.background_6 = new Sprite(g_images.Background_6);

  // Bullets
  g_sprites.bullet_1 = new Sprite(g_images.Bullet_1);
  g_sprites.bullet_2 = new Sprite(g_images.Bullet_2);
  g_sprites.bullet_3 = new Sprite(g_images.Bullet_3);
  g_sprites.bullet_4 = new Sprite(g_images.Bullet_4);
  g_sprites.bullet_5 = new Sprite(g_images.Bullet_5);

  // Walls
  g_sprites.wall_ground = new Sprite(g_images.Wall_ground);
  g_sprites.wall_Stone1 = new Sprite(g_images.Wall_Stone1);
  g_sprites.wall_Stone2 = new Sprite(g_images.Wall_Stone1);
  g_sprites.wall_Steel = new Sprite(g_images.Wall_Steel);
  g_sprites.wall_Wood = new Sprite(g_images.Wall_Wood);

  // Balls
  g_sprites.Ball_Blue1 = new Sprite(g_images.Ball_Blue1);          
  g_sprites.Ball_Blue2 = new Sprite(g_images.Ball_Blue1);          
  g_sprites.Ball_Brown1  = new Sprite(g_images.Ball_Brown1);         
  g_sprites.Ball_Brown2  = new Sprite(g_images.Ball_Brown2);         
  g_sprites.Ball_Green = new Sprite(g_images.Ball_Green);          
  g_sprites.Ball_GreenBlue = new Sprite(g_images.Ball_GreenBlue);      
  g_sprites.Ball_Grey  = new Sprite(g_images.Ball_Grey);            
  g_sprites.Ball_LightBlue = new Sprite(g_images.Ball_LightBlue);      
  g_sprites.Ball_LightGreen  = new Sprite(g_images.Ball_Green);      
  g_sprites.Ball_Orange  = new Sprite(g_images.Ball_Orange);           
  g_sprites.Ball_Pink  = new Sprite(g_images.Ball_Pink);            
  g_sprites.Ball_Purple  = new Sprite(g_images.Ball_Purple);          
  g_sprites.Ball_Red = new Sprite(g_images.Ball_Red);           
  g_sprites.Ball_SeaGreen  = new Sprite(g_images.Ball_SeaGreen);        
  g_sprites.Ball_WineRed = new Sprite(g_images.Ball_WineRed);         
  g_sprites.Ball_Yellow1 = new Sprite(g_images.Ball_Yellow1);                        
  g_sprites.Ball_Yellow2 = new Sprite(g_images.Ball_Yellow2); 

  // PowerUps
  g_sprites.Power_LiveRedHeart = new Sprite(g_images.Power_LiveRedHeart);

  // Create Map number map_num
  var map_num = 1;
  generateMap(map_num, g_sprites);

  main.init();
}

// Kick it off
requestPreloads();

var playX = 100;
var playY = 100;

function st_screen(x, y) {
  console.log(x + "   " + y);
  if (x > 100 - g_images.Chick_BW.width / 2 && x < 100 + g_images.Chick_BW.width / 2) {
    if (y > 400 - g_images.Chick_BW.height / 2 && y < 400 + g_images.Chick_BW.height / 2) {
      characterChosen = 0;
    }
  }
  if (x > 300 - g_images.AnotherdevilBW.width / 2 && x < 300 + g_images.AnotherdevilBW.width / 2) {
    if (y > 400 - g_images.AnotherdevilBW.height / 2 && y < 400 + g_images.AnotherdevilBW.height / 2) {
      characterChosen = 1;
    }
  }
  if (x > 500 - g_images.Deathnote_BW.width / 2 && x < 500 + g_images.Deathnote_BW.width / 2) {
    if (y > 400 - g_images.Deathnote_BW.height / 2 && y < 400 + g_images.Deathnote_BW.height / 2) {
      characterChosen = 2;
    }
  }
  if (x > 700 - g_images.Golbez_BW.width / 2 && x < 700 + g_images.Golbez_BW.width / 2) {
    if (y > 400 - g_images.Golbez_BW.height / 2 && y < 400 + g_images.Golbez_BW.height / 2) {
      characterChosen = 3;
    }
  }
  if (x > 350 /* - g_images.Play.width / 2 */ && x < 350 + g_images.Play.width) {
    if (y > 200 /*-g_images.Play.height / 2 */ && y < 200 + g_images.Play.height) {
      state.startGame = true;
    }
  }
}

function drawStartScreen(ctx) {
  ctx.drawImage(g_images.Play, 350, 200);
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
  }
}

function drawChick(ctx) {
  ctx.save();
  ctx.translate(100, 400);
  ctx.scale(2, 2)
  ctx.drawImage(g_images.Chick_Color, -g_images.Chick_Color.width / 2, -g_images.Chick_Color.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(300, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.AnotherdevilBW, -g_images.AnotherdevilBW.width / 2, -g_images.AnotherdevilBW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(500, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Deathnote_BW, -g_images.Deathnote_BW.width / 2, -g_images.Deathnote_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(700, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Golbez_BW, -g_images.Golbez_BW.width / 2, -g_images.Golbez_BW.height / 2);
  ctx.restore();
}

function drawAnotherDevil(ctx) {
  ctx.save();
  ctx.translate(100, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Chick_BW, -g_images.Chick_BW.width / 2, -g_images.Chick_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(300, 400);
  ctx.scale(2, 2)
  ctx.drawImage(g_images.Anotherdevil_Color, -g_images.Anotherdevil_Color.width / 2, -g_images.Anotherdevil_Color.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(500, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Deathnote_BW, -g_images.Deathnote_BW.width / 2, -g_images.Deathnote_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(700, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Golbez_BW, -g_images.Golbez_BW.width / 2, -g_images.Golbez_BW.height / 2);
  ctx.restore();
}

function drawDeathnote(ctx) {
  ctx.save();
  ctx.translate(100, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Chick_BW, -g_images.Chick_BW.width / 2, -g_images.Chick_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(300, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.AnotherdevilBW, -g_images.AnotherdevilBW.width / 2, -g_images.AnotherdevilBW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(500, 400);
  ctx.scale(2, 2)
  ctx.drawImage(g_images.Deathnote_Color, -g_images.Deathnote_Color.width / 2, -g_images.Deathnote_Color.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(700, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Golbez_BW, -g_images.Golbez_BW.width / 2, -g_images.Golbez_BW.height / 2);
  ctx.restore();
}

function drawGolbez(ctx) {
  ctx.save();
  ctx.translate(100, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Chick_BW, -g_images.Chick_BW.width / 2, -g_images.Chick_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(300, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.AnotherdevilBW, -g_images.AnotherdevilBW.width / 2, -g_images.AnotherdevilBW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(500, 400);
  ctx.scale(1.5, 1.5)
  ctx.drawImage(g_images.Deathnote_BW, -g_images.Deathnote_BW.width / 2, -g_images.Deathnote_BW.height / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(700, 400);
  ctx.scale(2, 2)
  ctx.drawImage(g_images.Golbez_Color, -g_images.Golbez_Color.width / 2, -g_images.Golbez_Color.height / 2);
  ctx.restore();
}