var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // Powerup CLASS
    var Power = (function (_super) {
        __extends(Power, _super);
        // CONSTRUCTOR
        function Power() {
            _super.call(this, "power");
            this.sound = "pick";
            this._dx = 5;
            this.isHarmful = false;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Power.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Power.prototype.reset = function () {
            this.x = 800;
            //this.y = 0;
            //this.x = -this.width;
            this.y = Math.floor(Math.random() * 600) + this.width;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Power.prototype._checkBounds = function () {
            // check if powerup is outside screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Power;
    })(objects.GameObject);
    objects.Power = Power;
})(objects || (objects = {}));
//# sourceMappingURL=power.js.map