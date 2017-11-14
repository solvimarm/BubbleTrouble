function createLEVELS(g_sprites) {
    var LEVELS = [
        {// LEVEL 0 ////////////////////////////////////////////// 
            background: 0,
            balls: [
                //{cx: 150, cy: 100, velX: -1, size: 3},
                //{cx: 150, cy: 100, velX: -1, size: 2},
                //{cx: 150, cy: 100, velX: -1, size: 1},
                {cx: 150, cy: 100, velX: -1, size: 0}
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone2},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Wood}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 5,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        },

        {// LEVEL 1 //////////////////////////////////////////////
            background: 1,
            balls: [
                //{cx: 100, cy: 100, velX: 1, size: 3},
                {cx: 700, cy: 100, velX: -1, size: 1}
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone2},
                {x: 400, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone2},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Wood}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 1,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        },
        {// LEVEL 2 //////////////////////////////////////////////
            background: 2,
            balls: [
                //{cx: 30, cy: 100, velY: 0, velX: 1, size: 0},
                //{cx: 50, cy: 100, velX: 1, size: 0},
                //{cx: 70, cy: 100, velX: 1, size: 0},
                //{cx: 110, cy: 100, velX: 1, size: 0},
                //{cx: 130, cy: 100, velX: 1, size: 0},
                {cx: 150, cy: 100, velX: 1, size: 0},
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone2},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Wood}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 1,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        },
        {// LEVEL 3 //////////////////////////////////////////////
            background: 3,
            balls: [
                //{cx: 50, cy: 100, velX: 1, size: 1},
                //{cx: 100, cy: 200, velX: 1, size: 1},
                //{cx: 150, cy: 200, velX: 1, size: 1},
                {cx: 200, cy: 100, velX: 1, size: 1},
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone2},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Wood}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 1,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        },
        {// LEVEL 4 //////////////////////////////////////////////
            background: 4,
            balls: [
                {cx: 100, cy: 300, velX: 1, size: 2},
                {cx: 100, cy: 100, velX: -1, size: 2}
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Steel},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone1}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 5,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        },
          {// LEVEL 5 //////////////////////////////////////////////
            background: 5,
            balls: [
                {cx: 100, cy: 300, velX: 1, size: 3},
                {cx: 100, cy: 100, velX: -1, size: 3}
            ],
            walls: [
                {x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, ballsToHit: 10, sprite: g_sprites.wall_ground},
                {x: 0, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Steel},
                {x: 784, y: 0, width: 16, height: 500, type: 0, ballsToHit: 10, sprite: g_sprites.wall_Stone1}
            ],
            ceilings: [
                {y: 0, vel: 0, minX: 0, maxX: g_canvas.width}
            ],
            character: {
                cx: 400,
                cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
                bulletType: 5,
                sprite: g_sprites.mainCharacterStill[characterChosen]
            }
        }
    ];
    return LEVELS;
}


function generateMap(map_number) {
    // My level is object
    var LEVELS = createLEVELS(g_sprites);
    var level = LEVELS[map_number];
    
    entityManager.clear();
    entityManager.deferredSetup();
    
    entityManager.generateBackground({
        sprite: g_sprites.background[util.mod(level.background, g_sprites.background.length)]
    });

    for(var i = 0; i < g_LIVES; i++){
        entityManager.generateLives();
    }
    
    // Generate all Ceilings
    for (var i = 0; i < level.ceilings.length; i++) {
        entityManager.generateCeiling(level.ceilings[i]);
    }

    // Generate all Walls
    for (var i = 0; i < level.walls.length; i++) {
        entityManager.generateWall(level.walls[i]);
    }

    entityManager.generateLives();

    var numberOfBalls = 0;
    // Generate all Balls
    for (var i = 0; i < level.balls.length; i++) {
        entityManager.generateBall(level.balls[i]);
        numberOfBalls += Math.pow(2, level.balls[i].size + 1) - 1;
    }
    // Generate Character
    entityManager.generateMainCharacter(level.character);
    entityManager.initiateLevel(map_number, numberOfBalls);
}