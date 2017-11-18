/*
    Constructor:

    new Powerup({
        cx: 100,
        cy: 10
    });

    A random powerup should appear when created, and glide at a 
    constant speed to the ground below. (Only)
    
    Should disappear
    after some time after it has reached the ground.
*/

function Powerup(descr){
    this.setup(descr);
    this.radius = POWER_IMAGE_HEIGHT/2;

    if(this.power === "extratime"){
        this.Powerup = g_sprites.Power_hourglass;
    }
    if(this.power === "chain_red"){
        this.Powerup = g_sprites.Power_chainRed;
    }
    if(this.power === "ray_yellow"){
        this.Powerup = g_sprites.Power_rayYellow;
    }
    if(this.power === "ray_green"){
        this.Powerup = g_sprites.Power_rayGreen;
    }
    if(this.power === "extralife"){
        this.Powerup = g_sprites.Power_LiveRedHeart;
    }
    if(this.power === "shield"){
        this.Powerup = g_sprites.Power_shield;
    }
}

Powerup.prototype = new Entity();
Powerup.prototype.lifeSpan = 2*SECS_TO_NOMINALS;
Powerup.prototype.alive = true;


Powerup.prototype.update = function(du){
    spatialManager.unregister(this);
    if(!this.alive){
        return entityManager.KILL_ME_NOW;
    }
    if(this.lifeSpan <= 0){
        return entityManager.KILL_ME_NOW;
    }
    if(this.cy+POWER_IMAGE_HEIGHT/2 <= Y_BOTTOM){
        this.cy += du;
    }
    if(this.cy+POWER_IMAGE_HEIGHT/2 >= Y_BOTTOM){
        this.lifeSpan -= du;
    }
    spatialManager.register(this);
};

Powerup.prototype.render = function(ctx){
    this.Powerup.drawWrappedCentredAt(ctx, this.cx, this.cy);
};
Powerup.prototype.getRadius = function(){
    return this.radius;
};

function maybeCreatePower(cx, cy) {
    var power = ["extratime", "chain_red", "ray_yellow", "ray_green", "extralife", "shield"];
    // randNum er stak í [0,20]
    var randNum = util.wholeRandRange(0,20);
    // ef randNum er í [0,5] þá createPower
    if(randNum < 6){
        entityManager.CreatePower(cx,cy, power[randNum]);
    }
    //console.log("xhnit: " + cx + "yhnit: " + cy)

    //if(power[randNum] != "none"){        
    //    entityManager.CreatePower(cx,cy, power[randNum]);
   // }
}