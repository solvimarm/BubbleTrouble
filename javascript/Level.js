function _createSingleLevel(backgroundID, useEdgeWalls, characterXPos, levelTime, balls, walls, ceilings, bullet) {
    var level = {
        background: backgroundID,
        balls: balls,
        walls: walls,
        ceilings: ceilings,
        character: {
            cx: characterXPos,
            cy: Y_BOTTOM - g_sprites.mainCharacterStill[characterChosen].height / 2,
            bulletType: bullet,
            gameBar: g_canvas.width,
            sprite: g_sprites.mainCharacterStill[characterChosen]
        }, 
        levelTime: levelTime
    };
    ceilings.push({y: 0, vel: 0, minX: 0, maxX: g_canvas.width});
    level.walls.push({x: 0, y: Y_BOTTOM, width: g_canvas.width, height: 100, type: 0, sprite: g_sprites.wall_ground});
    if(useEdgeWalls) {
        level.walls.push({x: 0, y: 0, width: 16, height: 500, type: 0, sprite: g_sprites.wall_Stone1});
        level.walls.push({x: 784, y: 0, width: 16, height: 500, type: 0, sprite: g_sprites.wall_Stone1})
    }
    return level;
}

function createLEVELS(g_sprites) {
    var LEVELS = [
        _createSingleLevel( // Level 1
            backgroundID = 0,
            useEdgeWalls = true,
            characterXPos = 100, 
            levelTime = 30, 
            balls = [
                {cx: 50, cy: 200, velX: -1, size: 2},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        _createSingleLevel( // Level 2
            backgroundID = 1,
            useEdgeWalls = false,
            characterXPos = 300, 
            levelTime = 40, 
            balls = [
                {cx: 100, cy: 100, velX: 1, size: 2},
                {cx: 700, cy: 100, velX: -1, size: 3}
            ], 
            walls = [
                {x: 0, y: 0, width: 16, height: 500, type: 0, sprite: g_sprites.wall_Wood},
                {x: 784, y: 0, width: 16, height: 500, type: 0, sprite: g_sprites.wall_Wood},
                {x: 398, y: 0, width: 20, height: 430, type: 0, sprite: g_sprites.wall_Wood},
                {x: 398, y: 430, width: 20, height: 70, type: 0, ballsToHit: 7, sprite: g_sprites.wall_Wood},
            ], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        _createSingleLevel( // Level 3
            backgroundID = 2,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 160, cy: 300, velX: 1, size: 1},
                {cx: 320, cy: 300, velX: 1, size: 1},
                {cx: 480, cy: 300, velX: 1, size: 1},
                {cx: 640, cy: 300, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        _createSingleLevel( // Level 4
            backgroundID = 3,
            useEdgeWalls = true,
            characterXPos = 100, 
            levelTime = 45, 
            balls = [
                {cx: 50, cy: 100, velX: -1, size: 2},
                {cx: 350, cy: 100, velX: 1, size: 2},
                {cx: 650, cy: 100, velX: -1, size: 2}
            ], 
            walls = [
                {x: 266, y: 0, width: 20, height: 500, type: 0, ballsToHit: 7, sprite: g_sprites.wall_Stone1},
                {x: 544, y: 0, width: 20, height: 500, type: 0, ballsToHit: 14, sprite: g_sprites.wall_Stone1},
            ], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        
        _createSingleLevel( // Level 6
            backgroundID = 5,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 80, 
            balls = [
                {cx: 100, cy: 100, velX: 1, size: 4},
                {cx: 700, cy: 100, velX: -1, size: 4},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: Svenni  
        ),
        _createSingleLevel( // Level 7
            backgroundID = 6,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 60, 
            balls = [
                {cx: 100, cy: 100, velX: 1, size: 3},
                {cx: 700, cy: 400, velX: -1, size: 3},
            ], 
            walls = [
                {x: 0, y: 250, width: 800, height: 20, type: 0, ballsToHit: 15, sprite: g_sprites.wall_Stone2},
            ], 
            ceilings = [],
            bullet = "ray_yellow"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        _createSingleLevel( // Level 8
            backgroundID = 7,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 50, cy: 150, velX: 1, size: 0},
                {cx: 70, cy: 150, velX: 1, size: 0},
                {cx: 90, cy: 150, velX: 1, size: 0},
                {cx: 110, cy: 150, velX: 1, size: 0},
                {cx: 130, cy: 150, velX: 1, size: 0},
                {cx: 150, cy: 150, velX: 1, size: 0},    
                {cx: 170, cy: 150, velX: 1, size: 0},
                {cx: 190, cy: 150, velX: 1, size: 0},
                {cx: 50, cy: 350, velX: 1, size: 0},
                {cx: 70, cy: 350, velX: 1, size: 0},
                {cx: 90, cy: 350, velX: 1, size: 0},
                {cx: 110, cy: 350, velX: 1, size: 0},
                {cx: 130, cy: 350, velX: 1, size: 0},
                {cx: 150, cy: 350, velX: 1, size: 0},    
                {cx: 170, cy: 350, velX: 1, size: 0},
                {cx: 190, cy: 350, velX: 1, size: 0},
            ], 
            walls = [
                {x: 0, y: 200, width: g_canvas.width, height: 32, type: 0, ballsToHit: 8, sprite: g_sprites.wall_Stone1}
            ], 
            ceilings = [],
            bullet = "ray_yellow"
            // Undirskrift fyrir því að borð sé komið: Helgi
        ),
        _createSingleLevel( // Level 9
            backgroundID = 8,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: sölvi
        ),
        _createSingleLevel( // Level 10
            backgroundID = 0,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 15, 
            balls = [
                {cx: 50, cy: 460, velX: 1, size: 0},
                {cx: 70, cy: 460, velX: 1, size: 0},
                {cx: 90, cy: 460, velX: 1, size: 0},
                {cx: 110, cy: 460, velX: 1, size: 0},
                {cx: 130, cy: 460, velX: 1, size: 0},
                {cx: 150, cy: 460, velX: 1, size: 0},
                {cx: 170, cy: 460, velX: 1, size: 0},
                {cx: 190, cy: 460, velX: 1, size: 0},
                {cx: 210, cy: 460, velX: 1, size: 0},
                {cx: 230, cy: 460, velX: 1, size: 0},
                {cx: 250, cy: 460, velX: 1, size: 0},
            ], 
            walls = [], 
            ceilings = [{y:425,vel:0}],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Sölvi
        ),
        _createSingleLevel( // Level 11
            backgroundID = 2,
            useEdgeWalls = true,
            characterXPos = 750, 
            levelTime = 30, 
            balls = [
                {cx: 50, cy: 400, velX: 1, size: 0},
                {cx: 60, cy: 390, velX: 1, size: 0},
                {cx: 70, cy: 380, velX: 1, size: 0},
                {cx: 80, cy: 370, velX: 1, size: 0},
                {cx: 90, cy: 360, velX: 1, size: 0},

                {cx: 160, cy: 400, velX: 1, size: 0},
                {cx: 170, cy: 390, velX: 1, size: 0},
                {cx: 180, cy: 380, velX: 1, size: 0},
                {cx: 190, cy: 370, velX: 1, size: 0},
                {cx: 200, cy: 360, velX: 1, size: 0},

                {cx: 260, cy: 400, velX: 1, size: 0},
                {cx: 270, cy: 390, velX: 1, size: 0},
                {cx: 280, cy: 380, velX: 1, size: 0},
                {cx: 290, cy: 370, velX: 1, size: 0},
                {cx: 300, cy: 360, velX: 1, size: 0}
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: sölvi
        ),
        _createSingleLevel( // Level 12
            backgroundID = 11,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 150, 
            balls = [
                {cx: 50, cy: 440, velX: 1, size: 0},
                {cx: 65, cy: 450, velX: 1, size: 0},
                {cx: 80, cy: 460, velX: 1, size: 0},
                {cx: 160, cy: 440, velX: 1, size: 0},
                {cx: 170, cy: 450, velX: 1, size: 0},
                {cx: 180, cy: 460, velX: 1, size: 0},
                {cx: 260, cy: 440, velX: 1, size: 0},
                {cx: 270, cy: 450, velX: 1, size: 0},
                {cx: 280, cy: 460, velX: 1, size: 0},

                {cx: 180, cy: 350, velX: 1, size: 1},
                {cx: 280, cy: 350, velX: 1, size: 1},
                {cx: 380, cy: 350, velX: 1, size: 1},
                {cx: 480, cy: 350, velX: 1, size: 1},

                {cx: 580, cy: 270, velX: -1, size: 2},
                {cx: 680, cy: 270, velX: -1, size: 2},
                {cx: 780, cy: 270, velX: -1, size: 2},
                {cx: 480, cy: 270, velX: -1, size: 2},

                {cx: 200, cy: 50, velX: 1, size: 3},
                {cx: 600, cy: 50, velX: -1, size: 3}
              
            ], 
            walls = [
                
                {x: 0, y: 230, width: g_canvas.width, height: 16, type: 0, ballsToHit: 49, sprite: g_sprites.wall_Stone1},
                {x: 0, y: 300, width: g_canvas.width, height: 16, type: 0, ballsToHit: 21, sprite: g_sprites.wall_Stone1},
                {x: 0, y: 400, width: g_canvas.width, height: 16, type: 0, ballsToHit: 9, sprite: g_sprites.wall_Stone1},
            ], 
            ceilings = [],
            bullet = "chain_gray"
             // Undirskrift fyrir því að borð sé komið: sölvi
        ),
        _createSingleLevel( // Level 13
            backgroundID = 12,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 8, 
            balls = [
                {cx: 128, cy: 200, velX: 1, size: 0},
                {cx: 146, cy: 216, velX: 1, size: 0},
                {cx: 164, cy: 232, velX: 1, size: 0},
                {cx: 182, cy: 248, velX: 1, size: 0},
                {cx: 200, cy: 264, velX: 1, size: 0},
                {cx: 218, cy: 280, velX: 1, size: 0},
                {cx: 236, cy: 296, velX: 1, size: 0},
                {cx: 254, cy: 312, velX: 1, size: 0}
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: viktor
        ),
        _createSingleLevel( // Level 5
            backgroundID = 4,
            useEdgeWalls = true,
            characterXPos = 700, 
            levelTime = 100, 
            balls = [
                {cx: 50, cy: 100, velX: 0, size: 0},
                {cx: 100, cy: 100, velX: 0, size: 0},
                {cx: 150, cy: 100, velX: 0, size: 0},
                {cx: 200, cy: 100, velX: 0, size: 0},
                {cx: 250, cy: 100, velX: 0, size: 0},
                {cx: 300, cy: 100, velX: 0, size: 0},
                {cx: 350, cy: 100, velX: 0, size: 0},
                {cx: 400, cy: 100, velX: 0, size: 0},
                {cx: 450, cy: 100, velX: 0, size: 0},
                {cx: 500, cy: 100, velX: 0, size: 0},
                {cx: 550, cy: 100, velX: 0, size: 0},
                {cx: 600, cy: 100, velX: 0, size: 0},
                {cx: 650, cy: 100, velX: 0, size: 0},
                {cx: 700, cy: 100, velX: 0, size: 0},
            ], 
            walls = [], 
            ceilings = [],  
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: Svenni
        ),
        _createSingleLevel( // Level 14
            backgroundID = 13,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 118, cy: 200, velX: 1, size: 0},
                {cx: 136, cy: 216, velX: 1, size: 0},
                {cx: 154, cy: 232, velX: 1, size: 0},
                {cx: 172, cy: 248, velX: 1, size: 0},
                {cx: 190, cy: 264, velX: 1, size: 0},
                {cx: 358, cy: 280, velX: 1, size: 1},
                {cx: 396, cy: 280, velX: 1, size: 1},
                {cx: 584, cy: 200, velX: 1, size: 0},
                {cx: 602, cy: 216, velX: 1, size: 0},
                {cx: 630, cy: 232, velX: 1, size: 0},
                {cx: 648, cy: 248, velX: 1, size: 0},
                {cx: 666, cy: 264, velX: 1, size: 0}
            ], 
            walls = [  
                {x: 248, y: 0, width: 20, height: 430, type: 0, sprite: g_sprites.wall_Steel},
                {x: 248, y: 430, width: 20, height: 70, type: 0, ballsToHit: 5, sprite: g_sprites.wall_Wood},
                {x: 548, y: 0, width: 20, height: 430, type: 0, sprite: g_sprites.wall_Steel},
                {x: 548, y: 430, width: 20, height: 70, type: 0, ballsToHit: 11, sprite: g_sprites.wall_Wood},

                ],
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: viktor
        ),
        _createSingleLevel( // Level 15
            backgroundID = 14,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 40, 
            balls = [
                {cx: 220, cy: 40, velX: 1, size:  1},
                {cx: 340, cy: 40, velX: 1, size:  1},
                {cx: 460, cy: 40, velX: 1, size:  1},
                {cx: 720, cy: 240, velX: -1, size:  1},
                {cx: 600, cy: 240, velX: -1, size:  1},
                {cx: 480, cy: 240, velX: -1, size:  1},
                {cx: 380, cy: 240, velX: -1, size:  3},
            ], 
            walls = [
                {x: 0, y: 180, width: 700 , height: 10, type: 0, sprite: g_sprites.wall_Stone2},
                {x: 100, y: 360, width: 700 , height: 10, type: 0, sprite: g_sprites.wall_Stone2}    
            ], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: viktor 
        ),
        _createSingleLevel( // Level 16
            backgroundID = 15,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 50, 
            balls = [
                {cx: 100, cy: 300, velX: 1, size:  0},
                {cx: 100, cy: 80, velX: 1, size:  1},
                {cx: 300, cy: 80, velX: 1, size:  1},
                {cx: 500, cy: 80, velX: 1, size:  2},
                {cx: 700, cy: 80, velX: 1, size:  4},

            ], 
            walls = [
                {x: 200, y: 0, width: 20, height: 260, type: 0, sprite: g_sprites.wall_Stone1},
                {x: 400, y: 0, width: 20, height: 260, type: 0, sprite: g_sprites.wall_Stone2},
                {x: 600, y: 0, width: 20, height: 260, type: 0, sprite: g_sprites.wall_Steel},
                {x: 0, y: 260, width: 200 , height: 20, type: 0,  ballsToHit: 1, sprite: g_sprites.wall_Wood},
                {x: 200, y: 260, width: 200 , height: 20, type: 0,  ballsToHit: 3, sprite: g_sprites.wall_Wood},
                {x: 400, y: 260, width: 200 , height: 20, type: 0,  ballsToHit: 6, sprite: g_sprites.wall_Wood},
                {x: 600, y: 260, width: 200 , height: 20, type: 0,  ballsToHit: 10, sprite: g_sprites.wall_Wood},    

            ], 
            ceilings = [],
            bullet = "chain_gray"
            // Undirskrift fyrir því að borð sé komið: viktor
        ),
        _createSingleLevel( // Level 17
            backgroundID = 16,
            useEdgeWalls = true,
            characterXPos = 100, 
            levelTime = 60, 
            balls = [
                {cx: 100, cy: 200, velX: 1, size: 5},
                {cx: 700, cy: 200, velX: -1, size: 5},
            ], 
            walls = [
                {x: 600, y: 0,   width: 16, height: 250, type: 0, ballsToHit: 63, sprite: g_sprites.wall_Steel},
                {x: 600, y: 250, width: 16, height: 250, type: 0, ballsToHit: 63, sprite: g_sprites.wall_Steel},
            ], 
            ceilings = [],
            bullet = "ray_yellow"
            // Undirskrift fyrir því að borð sé komið: Svenni 
        ),
        _createSingleLevel( // Level 18
            backgroundID = 17,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: 
        ),
        _createSingleLevel( // Level 19
            backgroundID = 18,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: 
        ),
        _createSingleLevel( // Level 20
            backgroundID = 19,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: 
        ),
        _createSingleLevel( // Level 21
            backgroundID = 20,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
            // Undirskrift fyrir því að borð sé komið: 
        )
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

    entityManager.createTimeManager(level.levelTime);
    
    // Generate all Ceilings
    for (var i = 0; i < level.ceilings.length; i++) {
        entityManager.generateCeiling(level.ceilings[i]);
    }

    // Generate all Walls
    for (var i = 0; i < level.walls.length; i++) {
        entityManager.generateWall(level.walls[i]);
    }

    entityManager.generateLevelP(map_number); // print current level
    entityManager.generateLives();
    
    var numberOfBalls = 0;
    var lastLevel = LEVELS.length-1;
    
    // Generate all Balls
    for (var i = 0; i < level.balls.length; i++) {
        entityManager.generateBall(level.balls[i]);
        numberOfBalls += Math.pow(2, level.balls[i].size + 1) - 1;
    }
    
    // Generate Character
    entityManager.generateMainCharacter(level.character);
    entityManager.initiateLevel(map_number, numberOfBalls, lastLevel);
}