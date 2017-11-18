function Background(descr) {
    this.setup(descr);
}

Background.prototype = new Entity();

Background.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};

Background.prototype.render = function (ctx) {
    this.sprite.drawAt(ctx, 0, 0);
};