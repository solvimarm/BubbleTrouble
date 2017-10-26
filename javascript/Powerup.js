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
}

Powerup.prototype = new Entity();


Powerup.prototype.update = function(du){
    // TODO
};

Powerup.prototype.render = function(ctx){
    // TODO
};