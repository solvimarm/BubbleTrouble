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

// ====================
// CREATE INITIAL SHIPS
// ====================

function createMainCharacter() {
  entityManager.generateMainCharacter({
    cx: g_canvas.width/2,
    cy: g_canvas.height/2
  });
}

function generateCeiling() {
  entityManager.generateCeiling({
    y: 0,
    vel: 0,
    minX: 0,
    maxX: g_canvas.width
  });
}

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
    mainCharacter: "sprites/chick.png"
  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
var test = 0;

function preloadDone() {
  // Sprites for the Main Character walking left
  g_sprites.mainCharacter = [
    new Sprite(g_images.mainCharacter, 0, 104, 32, 52),
    new Sprite(g_images.mainCharacter, 32, 104, 32, 52),
    new Sprite(g_images.mainCharacter, 64, 104, 32, 52),
    new Sprite(g_images.mainCharacter, 96, 104, 32, 52)
  ];
  //entityManager.init();
  createMainCharacter();
  generateCeiling();

  main.init();
}

// Kick it off
requestPreloads();
