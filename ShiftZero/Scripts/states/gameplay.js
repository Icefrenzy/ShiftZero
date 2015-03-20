/// <reference path="../objects/constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/power.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/icen.ts" />
/// <reference path="../objects/abyssal1.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/playerbulletmanager.ts" />
/// <reference path="../objects/label.ts" />
var states;
(function (states) {
    var GamePlay = (function () {
        function GamePlay() {
            this.abyssal = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
            this.game.addChild(this.ocean.secondary);
            //Powerup object
            this.power = new objects.Power();
            this.game.addChild(this.power);
            //Player Icen object
            this.icen = new objects.Icen();
            this.pbulletmanager = new objects.PlayerBulletManager(this.icen.x, this.icen.y);
            for (var b = 0; b < 20; b++) {
                this.pbulletmanager.bullets[b] = new objects.Bullet();
                this.game.addChild(this.pbulletmanager.bullets[b]);
            }
            this.game.addChild(this.icen);
            this.game.addChild(this.pbulletmanager);
            this.pbulletmanager.addEventListener("pressmove", this.pbulletmanager.mouseon);
            this.pbulletmanager.addEventListener("pressup", this.pbulletmanager.mouseout);
            for (var abyss = 2; abyss >= 0; abyss--) {
                this.abyssal[abyss] = new objects.Abyssal();
                this.game.addChild(this.abyssal[abyss]);
            }
            this.game.addChild(this.ocean.cloudoverlay);
            this.game.addChild(this.ocean.secondarycloudoverlay);
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        // DISTANCE CHECKING METHOD
        GamePlay.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlay.prototype.checkCollision = function (collider) {
            var icenPosition = new createjs.Point(this.icen.x, this.icen.y);
            var abyssPosition = new createjs.Point(collider.x, collider.y);
            var theDistance = this.distance(icenPosition, abyssPosition);
            if (theDistance < ((this.icen.height * 0.5) + (collider.height * 0.5))) {
                if (collider.isColliding != true) {
                    createjs.Sound.play(collider.sound);
                    if (!collider.isHarmful && collider.isActive) {
                        this.scoreboard.score += 100;
                    }
                    if (collider.isHarmful && collider.isActive) {
                        console.log("Player is hit!");
                        this.scoreboard.lives--;
                    }
                }
                collider.isColliding = true;
            }
            else {
                collider.isColliding = false;
            }
        };
        GamePlay.prototype.update = function () {
            //this.document.onkeydown = this.keyPressed;
            this.ocean.update();
            this.power.update();
            this.icen.update();
            this.pbulletmanager.update(this.icen.x, this.icen.y);
            for (var abyss = 2; abyss >= 0; abyss--) {
                this.abyssal[abyss].update();
                this.checkCollision(this.abyssal[abyss]);
            }
            this.checkCollision(this.power);
            console.log("Player X: " + this.icen.x + " Y: " + this.icen.y);
            this.scoreboard.update();
            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return GamePlay;
    })();
    states.GamePlay = GamePlay; // GamePlay Class
})(states || (states = {})); // States Module
//# sourceMappingURL=gameplay.js.map