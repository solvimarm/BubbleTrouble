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
                {cx: 50, cy: 100, velX: -1, size: 2},
                {cx: 350, cy: 100, velX: 1, size: 2},
                {cx: 650, cy: 100, velX: -1, size: 2}
            ], 
            walls = [
                {x: 266, y: 0, width: 20, height: 500, type: 0, ballsToHit: 7, sprite: g_sprites.wall_Wood},
                {x: 544, y: 0, width: 20, height: 500, type: 0, ballsToHit: 14, sprite: g_sprites.wall_Wood}
            ], 
            ceilings = [],
            bullet = "chain_gray"
        ),
        _createSingleLevel( // Level 2
            backgroundID = 1,
            useEdgeWalls = true,
            characterXPos = 300, 
            levelTime = 40, 
            balls = [
                {cx: 100, cy: 100, velX: 1, size: 2},
                {cx: 700, cy: 100, velX: -1, size: 3}
            ], 
            walls = [
                {x: 398, y: 0, width: 20, height: 430, type: 0, sprite: g_sprites.wall_Steel},
                {x: 398, y: 430, width: 20, height: 70, type: 0, ballsToHit: 7, sprite: g_sprites.wall_Wood},
            ], 
            ceilings = [],
            bullet = "chain_red"
        ),
        _createSingleLevel( // Level 3
            backgroundID = 2,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 20, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_yellow"
        ),
        _createSingleLevel( // Level 4
            backgroundID = 3,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 20, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 2},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_yellow"
        ),
        _createSingleLevel( // Level 5
            backgroundID = 4,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 3},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 6
            backgroundID = 5,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 40, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 0},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
        ),
        _createSingleLevel( // Level 7
            backgroundID = 6,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 8
            backgroundID = 7,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
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
        ),
        _createSingleLevel( // Level 10
            backgroundID = 9,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 11
            backgroundID = 10,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 12
            backgroundID = 11,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 13
            backgroundID = 12,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 14
            backgroundID = 13,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 15
            backgroundID = 14,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 16
            backgroundID = 15,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
        ),
        _createSingleLevel( // Level 17
            backgroundID = 16,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 30, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 1},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "ray_green"
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