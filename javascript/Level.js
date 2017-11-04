/*
    The level object should maintain all entities in the level. 
    It should contain a counter on how many balls have been hit.
*/


function createLEVELS(g_sprites){
    var LEVELS = [
        { // level 1
            background: g_sprites.background_1, // Sprites 
            ball_cx: [100,700],
            ball_cy: [100,100],
            ball_velX: [1, -1],
            ball_type: [1, 1],
            ball_scale: [0.5, 0.5],
            wall_x: [0, 400],
            wall_y: [Y_BOTTOM, 0],
            wall_w: [g_canvas.width, 10],
            wall_h: [100, 500],
            wall_type: [0, 0],
            wall_ballsToHit: [10, 100],
            wall_sprites: [g_sprites.wall_ground, g_sprites.wall_1],
            ceiling_y: [0],
            ceiling_vel: [0],
            ceiling_minX: [0],
            ceiling_maxX: [g_canvas.width],
            character_cx: 400,
            character_cy: Y_BOTTOM - g_sprites.mainCharacterStill.height/2,
            character_sprite: g_sprites.mainCharacterStill
        }
    ];
    return LEVELS;
}


function generateMap(int, g_sprites){

    // My level is object
    var LEVELS = createLEVELS(g_sprites);
    var level = LEVELS[int];

    entityManager.generateBackground({
        sprite : level.background
    });
    
    // Generate all Ceilings
    for(var i = 0; i < level.ceiling_y.length; i++){
        entityManager.generateCeiling({
            y: level.ceiling_y[i],
            vel: level.ceiling_vel[i],
            minX: level.ceiling_minX[i],
            maxX: level.ceiling_maxX[i]
        });
    }

    // Generate all Walls
    for(var i = 0; i < level.wall_w.length; i++){
        entityManager.generateWall({
            x: level.wall_x[i],
            y: level.wall_y[i],
            width: level.wall_w[i],
            height: level.wall_h[i],
            type: level.wall_type[i],
            ballsToHit: level.wall_ballsToHit[i],
            sprite : level.wall_sprites[i]
        });
    }

    // Generate all Balls
    for(var i = 0; i < level.ball_cx.length; i++){
        entityManager.generateBall({
            cx: level.ball_cx[i],
            cy: level.ball_cy[i],
            velX: level.ball_velX[i],
            type: level.ball_type[i],
            scale: level.ball_scale[i]
        });
    }

    // Generate Character
    entityManager.generateMainCharacter({
        cx: level.character_cx,
        cy: level.character_cy,
        sprite: level.character_sprite
    });
}



