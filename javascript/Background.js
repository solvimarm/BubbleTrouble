

function Background(descr){
    this.setup(descr);
    console.log("Þetta er background");
    console.log(this.sprite);

    //this.sprite = this.sprite || g_sprites.wall;
}

Background.prototype = new Entity();


Background.prototype.update = function(du){
    // TODO
    spatialManager.unregister(this);
    spatialManager.register(this);

};

Background.prototype.render = function(ctx){
        this.sprite.drawAt(ctx, 0, 0);

    //this.sprite.drawAt(ctx, this.x, this.y);
    //console.log(this.sprite);
};