"use strict";

function countDown(){
  NEXT_LEVEL = true;
    if(NEXT_LEVEL){
       var Timer = setInterval(function(){
       timeleft--;
       if(timeleft <= 0){
          clearInterval(Timer);
          NEXT_LEVEL = false;
          timeleft = 3;
        }
      },1000);
   }
   g_isUpdatePaused = false;
}

function freezeTime(){
  var Timer = setInterval(function(){
  FREEZE_TIME -= 1;
  console.log(FREEZE_TIME);
  if(FREEZE_TIME <= 0){
      clearInterval(Timer);
      FREEZE = false;
      FREEZE_TIME = 5;
    }
  },1000);
}


function renderExtras(ctx){
  if(NEXT_LEVEL){
      if(timeleft === 3){
        g_sprites.Number_3.drawWrappedCentredAt(ctx, g_canvas.width/2, g_canvas.height/2);
      }
      if(timeleft === 2){
        g_sprites.Number_2.drawWrappedCentredAt(ctx, g_canvas.width/2, g_canvas.height/2);
      }
      if(timeleft === 1){
        g_sprites.Number_1.drawWrappedCentredAt(ctx, g_canvas.width/2, g_canvas.height/2);
      }
    }
    ctx.fillStyle ="red";
    ctx.fillRect(0,520,GAME_BAR,10);
    if(FREEZE){
      ctx.fillStyle ="green";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "black";
      ctx.font = "50px Arial Bold";
      ctx.fillText(FREEZE_TIME,g_canvas.width/2,60);
      ctx.shadowBlur = null;
      ctx.shadowColor = "none";
    }
}