var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // OCEAN CLASS
    var Ocean = (function (_super) {
        __extends(Ocean, _super);
        // CONSTRUCTOR
        function Ocean() {
            _super.call(this, assetLoader.getResult("ocean"));
            // PUBLIC INSTANCE VARIABLES
            this._dx = 2;
            this._dxclouds = 0.6;
            this.x = 0;
            this.secondary = new createjs.Bitmap(this.image);
            this.secondary.x = 1410;
            this.cloudoverlay = new createjs.Bitmap(assetLoader.getResult("clouds"));
            this.cloudoverlay.x = 0;
            this.secondarycloudoverlay = new createjs.Bitmap(this.cloudoverlay.image);
            this.secondarycloudoverlay.x = 1410;
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Ocean.prototype.update = function () {
            // Move the ocean sideways  
            this.x -= this._dx;
            this.secondary.x -= this._dx;
            this.cloudoverlay.x -= this._dxclouds;
            this.secondarycloudoverlay.x -= this._dxclouds;
            this._checkBounds();
        };
        // Create the illusion of movement
        /*
        public reset() {
            this.x = -500;
            this.y = 0;
        }

        public resetSecondary() {
            this.secondary.x = -1000;
            this.secondary.y = 0;
        }*/
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Ocean.prototype._checkBounds = function () {
            // Ocean backdrop is pass 
            if (this.x < -1410) {
                this.x = 0;
                this.secondary.x = 1410;
            }
            if (this.cloudoverlay.x < -1410) {
                this.cloudoverlay.x = 0;
                this.secondarycloudoverlay.x = 1410;
            }
        };
        return Ocean;
    })(createjs.Bitmap);
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=ocean.js.map