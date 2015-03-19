var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // CLOUD CLASS
    var Abyssal = (function (_super) {
        __extends(Abyssal, _super);
        // CONSTRUCTOR
        function Abyssal() {
            _super.call(this, "abyss1");
            this.sound = "hurt";
            this.reset();
            this.isHarmful = true;
            this.isFriendly = false;
            this.isActive = true;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Abyssal.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Abyssal.prototype.reset = function () {
            this.x = 800 + this.width;
            this.y = Math.floor(Math.random() * 600);
            this._dx = Math.floor(Math.random() * 6) + 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Abyssal.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Abyssal;
    })(objects.GameObject);
    objects.Abyssal = Abyssal;
})(objects || (objects = {}));
//# sourceMappingURL=abyssal1.js.map