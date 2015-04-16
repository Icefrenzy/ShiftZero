module objects {
    // CLOUD CLASS
    export class Abyssal2 extends objects.GameObject {
        public isFiring: boolean;
        public bulletindex: number;
        public timer: number;
        private shootsfx: string;

        // CONSTRUCTOR
        constructor() {
            super("abyss2");
            this.sound = "hurt";
            this.reset();
            this.isHarmful = false;
            this.isFriendly = false;
            this.isActive = true;
            this.isFiring = false;
            this.timer = 0;
            this.health = 20;
            this.bulletindex = 0;
            this.shootsfx = "fire";
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;
            this.timer += 1 / 60;
            this._checkBounds();
            this.isFiring = true;
            if (this.isFiring) {
                if (this.timer > 1) {
                    createjs.Sound.play(this.shootsfx);
                    this.timer = 0;
                    this.bulletindex += 1;
                }
            }

            if (this.health == 0) {
                this.reset();
            }

            if (this.bulletindex == 19) {
                this.bulletindex = 0;
            }

            if (!this.isActive) {
                this.reset();
            }
        }

        public getdx() {
            return this._dx;
        }

        // Reset position of island to the top
        public reset() {
            this.health = 20;
            this.isActive = true;
            this.isFiring = false;
            this.timer = 0;
            this.x = 800+this.width;
            this.y = Math.floor(Math.random() * (600-200 +1)) + 200;
            this._dx = Math.floor(Math.random() * 2) + 1;
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