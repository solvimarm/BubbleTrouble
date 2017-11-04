// ==============
// BUBBLE TROUBLE
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

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
  entityManager.render(ctx);

  if (g_renderSpatialDebug) spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {
  var requiredImages = {
    MainCharacter: "Sprites/Charackters/Chick.png",
    Background_1: "Sprites/Backgrounds/Back_1.jpg",
    Background_2: "Sprites/Backgrounds/Back_2.jpg",
    Background_3: "Sprites/Backgrounds/Back_3.jpg",
    Background_4: "Sprites/Backgrounds/Back_4.jpg",
    Background_5: "Sprites/Backgrounds/Back_5.jpg",
    Background_6: "Sprites/Backgrounds/Back_6.jpg",
    Bullet_1: "Sprites/Bullets/Bullet_1.png",
    Bullet_2: "Sprites/Bullets/Bullet_2.png",
    Bullet_3: "Sprites/Bullets/Bullet_3.png",
    Wall_ground: "Sprites/Walls/Wall_Ground.png",
    Wall_1: "Sprites/Walls/Wall_1.png",
    Ball_Red: "Sprites/Balls/Ball_Red.png", 
    Ball_Blue: "Sprites/Balls/Ball_Blue.png",
    Ball_Green: "Sprites/Balls/Ball_Green.png",
    Ball_WineRed: "Sprites/Balls/Ball_WineRed.png",
    Ball_Orange: "Sprites/Balls/Ball_Orange.png",
    Ball_Brown: "Sprites/Balls/Ball_Brown.png",
    Ball_Grey: "Sprites/Balls/Ball_Grey.png",
    Ball_LightGreen: "Sprites/Balls/Ball_LightGreen.png",
    Ball_Purple: "Sprites/Balls/Ball_Purple.png",
    Ball_SeaGreen: "Sprites/Balls/Ball_SeaGreen.png",
    Ball_Yellow: "Sprites/Balls/Ball_Yellow.png",
    Ball_LightBlue: "Sprites/Balls/Ball_LightBlue.png"
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

  g_sprites.mainCharacterRight = [
    new Sprite(g_images.MainCharacter, 0, 104, 32, 52),
    new Sprite(g_images.MainCharacter, 32, 104, 32, 52),
    new Sprite(g_images.MainCharacter, 64, 104, 32, 52),
    new Sprite(g_images.MainCharacter, 96, 104, 32, 52)
  ];

  g_sprites.mainCharacterLeft = [
    new Sprite(g_images.MainCharacter, 96, 52, 32, 52),
    new Sprite(g_images.MainCharacter, 64, 52, 32, 52),
    new Sprite(g_images.MainCharacter, 32, 52, 32, 52),
    new Sprite(g_images.MainCharacter, 0, 52, 32, 52)
  ];

  g_sprites.mainCharacterStill = new Sprite(g_images.MainCharacter,0,0,32,52);
  
  g_sprites.bullet_1 = new Sprite(g_images.Bullet_1);
  g_sprites.bullet_2 = new Sprite(g_images.Bullet_2);
  g_sprites.bullet_3 = new Sprite(g_images.Bullet_3);
  
  g_sprites.wall_ground = new Sprite(g_images.Wall_ground);
  g_sprites.wall_1 = new Sprite(g_images.Wall_1);

  g_sprites.background_1 = new Sprite(g_images.Background_1);
  g_sprites.background_2 = new Sprite(g_images.Background_2);
  g_sprites.background_3 = new Sprite(g_images.Background_3);
  g_sprites.background_4 = new Sprite(g_images.Background_4);
  g_sprites.background_5 = new Sprite(g_images.Background_5);
  g_sprites.background_6 = new Sprite(g_images.Background_6);
  
  // Balls
  g_sprites.Ball_Red = new Sprite(g_images.Ball_Red);
  g_sprites.Ball_Blue = new Sprite(g_images.Ball_Blue);
  g_sprites.Ball_Green = new Sprite(g_images.Ball_Green);
  g_sprites.Ball_WineRed = new Sprite(g_images.Ball_WineRed);
  g_sprites.Ball_Orange = new Sprite(g_images.Ball_Orange);

  // Create Map number map_num
  var map_num = 1;
  generateMap(map_num, g_sprites);

  main.init();
}

// Kick it off
requestPreloads();
