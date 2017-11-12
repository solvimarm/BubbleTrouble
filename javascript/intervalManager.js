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
}

function gameOver(){
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
}

function renderExtras(){
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
}