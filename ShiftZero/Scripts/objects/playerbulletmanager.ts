module objects {

    export class Bullet extends objects.GameObject{
        // CONSTRUCTOR
        constructor() {
            super("bullet");
            this.sound = "fire";
            this.isHarmful = true;
            this.isFriendly = true;
            this.isActive = false;
            this.x = 1000;
            this.y = 1000;
        }
    }

    // Player Bullet Manager CLASS
    export class PlayerBulletManager extends objects.GameObject {

        public timer: number;
        public canfire: boolean;
        public bullets: objects.Bullet[];
        private tpx: number;
        private tpy: number;
        private bulletindex: number;

        // CONSTRUCTOR
        constructor(px:number,py:number) {
            super("manager");
            this.tpx = px;
            this.tpy = py;
            this.x = px;
            this.y = py;
            this.isHarmful = false;
            this.isFriendly = true;
            this.isActive = true;
            this.canfire = false;
            this._dx = 8;
            this.bullets = [];
            this.timer = 0;
            this.bulletindex = 0;
            for (var b = 0; b < 20; b++) {
                this.bullets[b] = new Bullet();
                stage.addChild(this.bullets[b]);
                console.log("Bullet[" + b + "] X: " + this.bullets[b].x + " Y: " + this.bullets[b].y + " isActive: " + this.bullets[b].isActive);
            }
        }

        public mouseon(event: createjs.MouseEvent) {
            event.currentTarget.canfire = true;
        }

        public mouseout(event: createjs.MouseEvent) {
            event.currentTarget.canfire = false;
        }


        public update(px: number, py: number) {
            this.x = px;
            this.y = py;
            this.timer += 1/60;
            //console.log("Manager X: " + this.x + " Manager Y: " + this.y);
            for (var b = 0; b < 20; b++){
                this._checkBounds(this.bullets[b]);
                if (this.bullets[b].isActive) {
                    this.bullets[b].x += this._dx;
                } else {
                    this.bullets[b].x = 1000;
                    this.bullets[b].y = 1000;
                }
            }

            if (this.canfire) {
                if (this.bulletindex == 19) {
                   this.bulletindex = 0;
                }
                if (this.timer > 0.1) {
                    this.bulletindex += 1;
                    this.timer = 0;
                    console.log("Can Fire");
                    if (this.bullets[this.bulletindex].isActive == false) {
                        this.bullets[this.bulletindex].x = this.x;
                        this.bullets[this.bulletindex].y = this.y;
                        this.bullets[this.bulletindex].isActive = true;
                        console.log("Bullet[" + this.bulletindex + "] X: " + this.bullets[this.bulletindex].x + " Y: " + this.bullets[this.bulletindex].y + " isActive: " + this.bullets[this.bulletindex].isActive);
                    }
                }
            }

        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds(bullet:objects.GameObject) {
            // check if powerup is outside screen
            if (bullet.x >= (800 + bullet.width)) {
                bullet.isActive = false;
            }
        }
    }
}