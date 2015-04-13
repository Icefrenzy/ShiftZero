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
    export class BulletManager extends objects.GameObject {

        public bullets: objects.Bullet[];
        private tpx: number;
        private tpy: number;


        // CONSTRUCTOR
        constructor(px:number,py:number, timer:number, bulletindex:number) {
            super("manager");
            this.tpx = px;
            this.sound = "fire";
            this.tpy = py;
            this.x = 1000;
            this.y = 1000;
            this.isHarmful = false;
            this.isFriendly = true;
            this.isActive = true;
            this._dx = 8;
            this.bullets = [];
        }

        public update(px: number, py: number, canfire: boolean, timer: number, bulletindex:number, _dx:number) {
            //console.log("Manager X: " + this.x + " Manager Y: " + this.y);

            // Player Bullets
            for (var b = 0; b < 20; b++){
                this._checkBounds(this.bullets[b]);

                if (this.bullets[b].isActive) {
                    if (this.bullets[b].isFriendly)
                        this.bullets[b].x += _dx;
                    else
                        this.bullets[b].x -= _dx*1.2;
                } else {
                    this.bullets[b].x = 1000;
                    this.bullets[b].y = 1000;
                }
            }

            if (canfire) {
                //console.log("Player can fire! Timer is: " + timer + ", index is: " + bulletindex);
                if (timer > 0.09) {
                    console.log("Can Fire");
                    if (this.bullets[bulletindex].isActive == false) {
                        this.bullets[bulletindex].x = px + 25;
                        this.bullets[bulletindex].y = py + 10;
                        this.bullets[bulletindex].isActive = true;
                        console.log("Bullet[" + bulletindex + "] X: " + this.bullets[bulletindex].x + " Y: " + this.bullets[bulletindex].y + " isActive: " + this.bullets[bulletindex].isActive);
                    }
                }
            }

        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds(bullet:objects.GameObject) {
            // check if powerup is outside screen
            if (bullet.x >= (800 + bullet.width) && bullet.isFriendly == true) {
                bullet.isActive = false;
            }

            if (bullet.x <= (0 - bullet.width) && bullet.isFriendly == false) {
                bullet.isActive = false;
            }
        }
    }
}