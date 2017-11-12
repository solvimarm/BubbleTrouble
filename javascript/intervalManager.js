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
          gameTime();
        }
      },1000);
   }
}

function gameTime(){
  var Timer = setInterval(function(){
    GAME_BAR -= g_canvas.width/(20*250);
    console.log(GAME_BAR);
    if(GAME_BAR <= 0){
      clearInterval(Timer);
      GAME_BAR = g_canvas.width;
    }
  },1);
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
}