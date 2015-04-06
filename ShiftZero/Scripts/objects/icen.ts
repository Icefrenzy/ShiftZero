
module objects {
    // Player ICEN CLASS
    export class Icen extends createjs.Bitmap {
        public isSlow: boolean;
        public width: number;
        public height: number;
        public moementumX: number;
        public moementumY: number;
        public canfire: boolean;
        public timer: number;
        public bulletindex: number;
        private _verticalspeed: number;
        private _horizontalspeed: number;
        private _soundOutdated: boolean;
        private _wasSlow: boolean;
        private _dx: number;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("icen"));
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
            createjs.Sound.play("engine", { loop: -1 });
        }

        public mouseon(event: createjs.MouseEvent) {
            event.currentTarget.canfire = true;
        }

        public mouseout(event: createjs.MouseEvent) {
            event.currentTarget.canfire = false;
        }

        // PUBLIC METHODS
        public update() {
            this.timer += 1 / 60;
            if (this.isSlow == true) {
                this._horizontalspeed = 0.3;
                this._verticalspeed = 0.2;
            } else if(this.isSlow == false){
                this._verticalspeed = 0.9;
                this._horizontalspeed = 0.5;
            }
            if (this.canfire) {
                if (this.timer > 0.1) {
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
            } else if (this.x > stage.mouseX + 5) {
                this.x -= this.moementumX;
                if (this.moementumX < 5) {
                    this.moementumX += this._verticalspeed;
                }
            } else {
                this.moementumX = 0;
            }

            // Momentum for Y movement
            if (this.y < stage.mouseY - 5) {
                this.y += this.moementumY;
                if (this.moementumY < 10) {
                    this.moementumY += this._horizontalspeed;
                }
            } else if (this.y > stage.mouseY + 5) {
                this.y -= this.moementumY;
                if (this.moementumY < 10) {
                    this.moementumY += this._horizontalspeed;
                }
            } else {
                this.moementumY = 0;
            }
        }

        public getdx() {
            return this._dx;
        }

    }

}  