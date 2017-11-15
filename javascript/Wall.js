/*
    Constructor:

    new Wall({
        x: 100,
        y: 10,
        width: 25,
        height: 300,
        type: 0 (id)
        ballsToHit: 7 
    });
    
    The wall object is a square that can disappaer once a certain amount of balls 
    have been hit. 
    This object can both be used as the edge walls, platforms and doors. 
    The type attribute switches to a predefined style (rendering) of the object.

    The Level object the wall is in should contain a counter counting how
    many times balls have been hit. Once the ballsToHit level has been reached, 
    the wall should disappear. If the ballsToHit is undefined, the wall should 
    never open.
*/

function Wall(descr){
    this.setup(descr);

    //this.sprite = this.sprite || g_sprites.wall;
}

Wall.prototype = new Entity();

Wall.prototype.isDisappearing = false;

Wall.prototype.update = function(du){
    spatialManager.unregister(this);

    var numberOfBallsHit = entityManager.numberOfBallsHit();
    if(numberOfBallsHit == this.ballsToHit) {
        this.isDisappearing = true;
    }

    if(this.isDisappearing) {
        this.height = this.height - 2*du;
        if(this.height < du) {
            return entityManager.KILL_ME_NOW;
        }
    }

    spatialManager.register(this);

};

Wall.prototype.render = function(ctx){
    this.sprite.drawAt(ctx, this.x, this.y, this.width, this.height);

    //this.sprite.drawAt(ctx, this.x, this.y);
    //console.log(this.sprite);
};
