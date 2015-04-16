/// <reference path="../objects/constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/power.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/icen.ts" />
/// <reference path="../objects/abyssal1.ts" />
/// <reference path="../objects/abyssal2.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/playerbulletmanager.ts" />
/// <reference path="../objects/label.ts" />
var states;
(function (states) {
    var GamePlay = (function () {
        function GamePlay() {
            this.abyssal = [];
            this.abyssal2 = [];
            // Abyss Black Fighter Projectiles
            this.ebulletmanager = [];
            // Abyss Battlecruiser Projectiles
            this.ebulletmanager2 = [];
            this.ebulletmanager3 = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            this.hittimer = 0;
            this.hittimerlimit = 0.5;
            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
            this.game.addChild(this.ocean.secondary);
            // Enemy Ships
            if (constants.DIFFICULTY_HARD) {
                for (var abyss = 1; abyss > 0; abyss--) {
                    this.abyssal2[abyss] = new objects.Abyssal2();
                    this.ebulletmanager2[abyss] = new objects.BulletManager(this.abyssal2[abyss].x, this.abyssal2[abyss].y, this.abyssal2[abyss].timer, this.abyssal2[abyss].bulletindex);
                    this.ebulletmanager3[abyss] = new objects.BulletManager(this.abyssal2[abyss].x, this.abyssal2[abyss].y, this.abyssal2[abyss].timer, this.abyssal2[abyss].bulletindex);
                    this.game.addChild(this.abyssal2[abyss]);
                    for (var b = 0; b < 20; b++) {
                        this.ebulletmanager2[abyss].bullets[b] = new objects.Bullet("bullet2");
                        this.ebulletmanager2[abyss].bullets[b].isFriendly = false;
                        this.game.addChild(this.ebulletmanager2[abyss].bullets[b]);
                    }
                    for (var b = 0; b < 20; b++) {
                        this.ebulletmanager3[abyss].bullets[b] = new objects.Bullet("bullet2");
                        this.ebulletmanager3[abyss].bullets[b].isFriendly = false;
                        this.game.addChild(this.ebulletmanager3[abyss].bullets[b]);
                    }
                }
            }
            //Powerup object
            this.power = new objects.Power();
            this.game.addChild(this.power);
            //Player Icen object
            this.icen = new objects.Icen();
            this.pbulletmanager = new objects.BulletManager(this.icen.x, this.icen.y, this.icen.timer, this.icen.bulletindex);
            for (var b = 0; b < 20; b++) {
                this.pbulletmanager.bullets[b] = new objects.Bullet("bullet");
                this.game.addChild(this.pbulletmanager.bullets[b]);
            }
            this.game.addChild(this.icen);
            this.game.addChild(this.pbulletmanager);
            this.icen.addEventListener("pressmove", this.icen.mouseon);
            this.icen.addEventListener("pressup", this.icen.mouseout);
            for (var abyss = 2; abyss >= 0; abyss--) {
                this.abyssal[abyss] = new objects.Abyssal();
                this.ebulletmanager[abyss] = new objects.BulletManager(this.abyssal[abyss].x, this.abyssal[abyss].y, this.abyssal[abyss].timer, this.abyssal[abyss].bulletindex);
                for (var b = 0; b < 20; b++) {
                    this.ebulletmanager[abyss].bullets[b] = new objects.Bullet("bullet");
                    this.ebulletmanager[abyss].bullets[b].isFriendly = false;
                    this.game.addChild(this.ebulletmanager[abyss].bullets[b]);
                }
                this.game.addChild(this.abyssal[abyss]);
            }
            this.game.addChild(this.ocean.cloudoverlay);
            this.game.addChild(this.ocean.secondarycloudoverlay);
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);
            createjs.Sound.play("ost1", { loop: -1 });
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
            for (var b = 0; b < 20; b++) {
                var bulletPosition = new createjs.Point(this.pbulletmanager.bullets[b].x, this.pbulletmanager.bullets[b].y);
                var bulletDistance = this.distance(bulletPosition, abyssPosition);
                if (bulletDistance < ((this.pbulletmanager.bullets[b].height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        if (collider.isActive && !collider.isFriendly && collider.isHarmful) {
                            createjs.Sound.play("hurt");
                            this.scoreboard.score += 50;
                            collider.isActive = false;
                            this.pbulletmanager.bullets[b].isActive = false;
                        }
                        if (collider.isActive && !collider.isFriendly && !collider.isHarmful) {
                            createjs.Sound.play("hurt");
                            collider.health -= 1;
                            this.pbulletmanager.bullets[b].isActive = false;
                        }
                    }
                }
            }
            if (theDistance < ((this.icen.height * 0.5) + (collider.height * 0.5))) {
                if (collider.isColliding != true) {
                    if (!collider.isHarmful && collider.isActive && collider.isFriendly) {
                        createjs.Sound.play(collider.sound);
                        this.scoreboard.score += 100;
                        this.power.reset();
                        collider.isActive = false;
                    }
                    if (this.hittimer >= this.hittimerlimit) {
                        this.hittimer = 0;
                        if (collider.isHarmful && collider.isActive) {
                            createjs.Sound.play("bullethurt");
                            console.log("Player is hit!");
                            this.scoreboard.lives--;
                        }
                    }
                }
                collider.isColliding = true;
            }
            else {
                collider.isColliding = false;
            }
        };
        GamePlay.prototype.update = function () {
            this.hittimer += 1 / 60;
            //this.document.onkeydown = this.keyPressed;
            this.ocean.update();
            this.power.update();
            this.icen.update();
            this.pbulletmanager.update(this.icen.x, this.icen.y, this.icen.canfire, this.icen.timer, this.icen.bulletindex, this.icen.getdx());
            for (var abyss = 2; abyss >= 0; abyss--) {
                this.abyssal[abyss].update();
                this.ebulletmanager[abyss].update(this.abyssal[abyss].x, this.abyssal[abyss].y, this.abyssal[abyss].isFiring, this.abyssal[abyss].timer, this.abyssal[abyss].bulletindex, this.icen.getdx());
                this.checkCollision(this.abyssal[abyss]);
                for (var b = 0; b < 20; b++) {
                    this.checkCollision(this.ebulletmanager[abyss].bullets[b]);
                }
            }
            // Abyss cruisers update
            if (constants.DIFFICULTY_HARD) {
                for (var abyss = 1; abyss > 0; abyss--) {
                    this.abyssal2[abyss].update();
                    this.ebulletmanager2[abyss].update(this.abyssal2[abyss].x, this.abyssal2[abyss].y, this.abyssal2[abyss].isFiring, this.abyssal2[abyss].timer, this.abyssal2[abyss].bulletindex, this.icen.getdx());
                    this.ebulletmanager3[abyss].update(this.abyssal2[abyss].x, this.abyssal2[abyss].y - 20, this.abyssal2[abyss].isFiring, this.abyssal2[abyss].timer, this.abyssal2[abyss].bulletindex, this.icen.getdx());
                    this.checkCollision(this.abyssal2[abyss]);
                    if (this.abyssal2[abyss].health == 0) {
                        this.scoreboard.score += 500;
                    }
                    for (var b = 0; b < 20; b++) {
                        this.ebulletmanager2[abyss].bullets[b].scaleX += 0.02;
                        this.ebulletmanager2[abyss].bullets[b].scaleY += 0.02;
                        this.checkCollision(this.ebulletmanager2[abyss].bullets[b]);
                    }
                    for (var b = 0; b < 20; b++) {
                        this.ebulletmanager3[abyss].bullets[b].scaleX += 0.02;
                        this.ebulletmanager3[abyss].bullets[b].scaleY += 0.02;
                        this.checkCollision(this.ebulletmanager3[abyss].bullets[b]);
                    }
                }
            }
            this.checkCollision(this.power);
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