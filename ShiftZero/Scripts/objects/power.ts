module objects {
    // Powerup CLASS
    export class Power extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("power");
            this.sound = "pick";
            this._dx = 5;
            this.isHarmful = false;
            this.reset();
            this.isFriendly = true;
            this.isActive = true;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;

            this._checkBounds();

            if (!this.isActive) {
                this.reset();
            }
        }

        // Reset position of powerup to the top
        public reset() {
            this.isActive = true;
            this.x = 800;
            //this.y = 0;
            //this.x = -this.width;
            this.y = Math.floor(Math.random() * 600)+this.width;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if powerup is outside screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        }

    }

} 