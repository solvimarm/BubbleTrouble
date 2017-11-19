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
        _createSingleLevel(
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
        _createSingleLevel(
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
        _createSingleLevel(
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
        _createSingleLevel(
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
        _createSingleLevel(
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
        _createSingleLevel(
            backgroundID = 5,
            useEdgeWalls = true,
            characterXPos = 400, 
            levelTime = 40, 
            balls = [
                {cx: 150, cy: 100, velX: 1, size: 4},
            ], 
            walls = [], 
            ceilings = [],
            bullet = "chain_gray"
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
    
    // Generate all Balls
    for (var i = 0; i < level.balls.length; i++) {
        entityManager.generateBall(level.balls[i]);
        numberOfBalls += Math.pow(2, level.balls[i].size + 1) - 1;
    }
    
    // Generate Character
    entityManager.generateMainCharacter(level.character);
    entityManager.initiateLevel(map_number, numberOfBalls);
}