module objects {
    // OCEAN CLASS
    export class Ocean extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        private _dx: number = 2;
        private _dxclouds: number = 0.6;
        public secondary: createjs.Bitmap;
        public cloudoverlay: createjs.Bitmap;
        public secondarycloudoverlay: createjs.Bitmap;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("ocean"));
            this.x = 0;
            this.secondary = new createjs.Bitmap(this.image);
            this.secondary.x = 1410;
            this.cloudoverlay = new createjs.Bitmap(assetLoader.getResult("clouds"));
            this.cloudoverlay.x = 0;
            this.secondarycloudoverlay = new createjs.Bitmap(this.cloudoverlay.image);
            this.secondarycloudoverlay.x = 1410;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            // Move the ocean sideways  
            this.x -= this._dx;
            this.secondary.x -= this._dx;
            this.cloudoverlay.x -= this._dxclouds;
            this.secondarycloudoverlay.x -= this._dxclouds;
            this._checkBounds();
        }

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
        private _checkBounds() {
            // Ocean backdrop is pass 

            if (this.x < -1410) {
                this.x = 0;
                this.secondary.x = 1410;
            }
            if (this.cloudoverlay.x < -1410) {
                this.cloudoverlay.x = 0;
                this.secondarycloudoverlay.x = 1410;
            }
        }

    }

}  