var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Player ICEN CLASS
    var Icen = (function (_super) {
        __extends(Icen, _super);
        // CONSTRUCTOR
        function Icen() {
            _super.call(this, assetLoader.getResult("icen"));
            this._verticalspeed = 0.9;
            this._horizontalspeed = 0.5;
            this.isSlow = false;
            this._soundOutdated = true;
            this._wasSlow = true;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.moementumX = 0;
            this.moementumY = 0;
            this.canfire = false;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.timer = 0;
            this.bulletindex = 0;
            this._dx = 8;
            this.shootsfx = "fire";
            createjs.Sound.play("engine", { loop: -1 });
        }
        Icen.prototype.mouseon = function (event) {
            event.currentTarget.canfire = true;
        };
        Icen.prototype.mouseout = function (event) {
            event.currentTarget.canfire = false;
        };
        // PUBLIC METHODS
        Icen.prototype.update = function () {
            this.timer += 1 / 60;
            if (this.isSlow == true) {
                this._horizontalspeed = 0.3;
                this._verticalspeed = 0.2;
            }
            else if (this.isSlow == false) {
                this._verticalspeed = 0.9;
                this._horizontalspeed = 0.5;
            }
            if (this.canfire) {
                if (this.timer > 0.1) {
                    createjs.Sound.play(this.shootsfx);
                    this.timer = 0;
                    this.bulletindex += 1;
                }
            }
            if (this.bulletindex == 19) {
                this.bulletindex = 0;
            }
            // Momentum for X movement
            if (this.x < stage.mouseX - 5) {
                this.x += this.moementumX;
                if (this.moementumX < 5) {
                    this.moementumX += this._verticalspeed;
                }
            }
            else if (this.x > stage.mouseX + 5) {
                this.x -= this.moementumX;
                if (this.moementumX < 5) {
                    this.moementumX += this._verticalspeed;
                }
            }
            else {
                this.moementumX = 0;
            }
            // Momentum for Y movement
            if (this.y < stage.mouseY - 5) {
                this.y += this.moementumY;
                if (this.moementumY < 10) {
                    this.moementumY += this._horizontalspeed;
                }
            }
            else if (this.y > stage.mouseY + 5) {
                this.y -= this.moementumY;
                if (this.moementumY < 10) {
                    this.moementumY += this._horizontalspeed;
                }
            }
            else {
                this.moementumY = 0;
            }
        };
        Icen.prototype.getdx = function () {
            return this._dx;
        };
        return Icen;
    })(createjs.Bitmap);
    objects.Icen = Icen;
})(objects || (objects = {}));
//# sourceMappingURL=icen.js.map