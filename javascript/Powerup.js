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

    if(this.power === "extratime"){
        this.Powerup = g_sprites.Power_hourglass;
    }
    if(this.power === "chain"){
        this.Powerup = g_sprites.Power_chain;
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


Powerup.prototype.update = function(du){
    //spatialManager.unregister(this);
    if(this.lifeSpan <= 0){
        return entityManager.KILL_ME_NOW;
    }
    if(this.cy+POWER_IMAGE_HEIGHT/2 <= Y_BOTTOM){
        this.cy += du;
    }
    if(this.cy+POWER_IMAGE_HEIGHT/2 >= Y_BOTTOM){
        this.lifeSpan -= du;
    }
    //spatialManager.register(this);
};

Powerup.prototype.render = function(ctx){
    this.Powerup.drawWrappedCentredAt(ctx, this.cx, this.cy);
};

function maybeCreatePower(cx, cy) {
    var power = ["extratime","chain", "extralife", "shield", "none"];
    //Get random number between 0 and 9 if value lower than 5 then you get a power up.
    var randNum = util.wholeRandRange(0,9);
    if(randNum >= 4){
        randNum = 4;
    }
    console.log("xhnit: " + cx + "yhnit: " + cy)

    if(power[randNum] != "none"){        
        entityManager.CreatePower(cx,cy, power[randNum]);
    }
}