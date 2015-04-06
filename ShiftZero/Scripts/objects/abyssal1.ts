module objects {
    // CLOUD CLASS
    export class Abyssal extends objects.GameObject {
        public isFiring: boolean;
        public bulletindex: number;
        public timer: number;

        // CONSTRUCTOR
        constructor() {
            super("abyss1");
            this.sound = "hurt";
            this.reset();
            this.isHarmful = true;
            this.isFriendly = false;
            this.isActive = true;
            this.isFiring = false;
            this.timer = 0;
            this.bulletindex = 0;
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;
            this.timer += 1 / 60;
            this._checkBounds();
            this.isFiring = true;
            if (this.isFiring) {
                if (this.timer > 0.5) {
                    this.timer = 0;
                    this.bulletindex += 1;
                }
            }

            if (this.bulletindex == 19) {
                this.bulletindex = 0;
            }
        }

        public getdx() {
            return this._dx;
        }

        // Reset position of island to the top
        public reset() {
            this.isFiring = false;
            this.timer = 0;
            this.x = 800+this.width;
            this.y = Math.floor(Math.random() * 600);
            this._dx = Math.floor(Math.random() * 6) + 4;
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