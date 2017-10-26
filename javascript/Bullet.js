/*
    Constructor:

    new Bullet({
        x: 10,
        y: 10,
        type: 0
    });

*/

function Bullet(descr){
    this.setup(descr);
}

Bullet.prototype = new Entity();


Bullet.prototype.update = function(du){
    // TODO
};

Bullet.prototype.render = function(ctx){
    // TODO
};