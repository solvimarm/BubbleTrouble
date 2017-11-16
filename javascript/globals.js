// =======
// GLOBALS
// =======
/*
Evil, ugly (but "necessary") globals, which everyone can use.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var Y_BOTTOM = 500;

var characterChosen = 0;

var POWER_IMAGE_HEIGHT = 25;
var SPIKE_HEIGHT = 12;

var NEXT_LEVEL = false;
var timeleft = 3;

var GAME_TIME = 30;

var GAME_BAR = g_canvas.width;

var FREEZE = false;

var FREEZE_TIME = 5;

var g_LIVES = 3;

// Song
var Play_Song = new Audio("Sounds/PlaySong.wav");
Play_Song.loop = true;
Play_Song.volume = 0.2;
var Start_Song = new Audio("Sounds/StartSong1.wav");
Start_Song.loop = true;
Start_Song.volume = 0.2;