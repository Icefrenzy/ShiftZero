module objects {
    // CLOUD CLASS
    export class Abyssal extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("abyss1");
            this.sound = "hurt";
            this.reset();
            this.isHarmful = true;
            this.isFriendly = false;
            this.isActive = true;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = 800+this.width;
            this.y = Math.floor(Math.random() * 600);
            this._dx = Math.floor(Math.random() * 6) + 2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        }

    }

}  