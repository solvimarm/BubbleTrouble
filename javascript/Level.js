/*
    
    The level object should maintain all entities in the level. 
    It should contain a counter on how many balls have been hit.

*/



function Level(descr){
    this.setup(descr);
}

Level.prototype.ballsHit = 0;

Level.prototype.update = function(du){
    // TODO
};

Level.prototype.render = function(ctx){
    // TODO
};