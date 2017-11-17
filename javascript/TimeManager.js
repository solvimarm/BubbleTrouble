
function TimeManager(levelTime){
    this.levelTime = levelTime*SECS_TO_NOMINALS;
    this.TOTAL_LEVEL_TIME = this.levelTime;
    this.countDown = 3*SECS_TO_NOMINALS;
}
TimeManager.prototype.delayedFunctions = [];
TimeManager.prototype.killedPlayed = false;

TimeManager.prototype.addTimer = function(func, seconds, ID) {
    this.delayedFunctions.push({func: func, time: seconds*SECS_TO_NOMINALS, ID: ID});
}

TimeManager.prototype.addExtraTime = function(seconds, ID) {
    for(var i = 0; i < this.delayedFunctions.length; i++) {
        if(this.delayedFunctions.ID === ID) {
            this.delayedFunctions.time += seconds*SECS_TO_NOMINALS;
            return;
        }
    }
}

TimeManager.prototype.update = function(du){
    
    if(!GAME_FREEZE) {
        if(this.countDown > 0) {
            this.countDown -= du;
    
            // -1 means to update nothing. 
            return -1;
        }
        
        this.levelTime -= du;
        if(this.levelTime < 0 && !this.killedPlayed) {
            this.killedPlayed = true;
            entityManager.killPlayer();
        }       
    }
    
    for(var i = this.delayedFunctions.length-1; i >= 0; i--) {
        this.delayedFunctions[i].time -= du;
        if(this.delayedFunctions[i].time < 0) {
            this.delayedFunctions[i].func();
            this.delayedFunctions.splice(i,1);
        }
    }
}

TimeManager.prototype.render = function(ctx){
    var padding = 16;
    var width = g_canvas.width - 2*padding;
    var ratio = Math.max(0, this.levelTime / this.TOTAL_LEVEL_TIME);
    var oldStyle = ctx.fillStyle;

    ctx.fillStyle ="black";
    ctx.fillRect(padding, 520, width, 10);
    ctx.fillStyle ="red";
    ctx.fillRect(padding, 520, width*ratio, 10);
    ctx.fillStyle = oldStyle;

    if(this.countDown > 0) {
        this.renderCountdown(ctx);
    }

    if(this.levelTime < 0){
        drawTimeIsUp(ctx);
    }
}

TimeManager.prototype.renderCountdown = function(ctx) {
    var counter = Math.ceil(this.countDown / SECS_TO_NOMINALS);
    var sprite = undefined;
    if(counter === 1) {
        sprite = g_sprites.Number_1;
    }
    else if(counter === 2) {
        sprite = g_sprites.Number_2;
    }
    else{
        sprite = g_sprites.Number_3;
    }
    sprite.drawWrappedCentredAt(ctx, g_canvas.width/2, g_canvas.height/2);
}

function drawTimeIsUp(ctx){
    var string = "Time's Up"
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(string, 300, 250);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
}
