/// <reference path="../objects/constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/power.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/icen.ts" />
/// <reference path="../objects/abyssal1.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/scoreboard.ts" />
var states;
(function (states) {
    // MENU STATE CLASS
    var Menu = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Menu() {
            this.play = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            this.wallpaper = new createjs.Bitmap(assetLoader.getResult("wallpaper"));
            this.wallpaper.x = 0;
            this.wallpaper.y = 0;
            this.game.addChild(this.wallpaper);
            this.icen = new objects.Icen();
            this.game.addChild(this.icen);
            this.gamelogo = new createjs.Bitmap(assetLoader.getResult("shiftlogo"));
            this.gamelogo.x = 200;
            this.gamelogo.y = this.gamelogo.y * 0.5;
            this.game.addChild(this.gamelogo);
            this.companylogo = new createjs.Bitmap(assetLoader.getResult("companylogo"));
            this.companylogo.x = this.companylogo.x * 0.5 + 600;
            this.companylogo.y = this.companylogo.y * 0.5 + 480;
            this.game.addChild(this.companylogo);
            //Game Over Label
            /*this.mailPilotLabel = new objects.Label(320, 40, "Shift Zero");
            this.mailPilotLabel.font = "60px Consolas";
            this.mailPilotLabel.regX = this.mailPilotLabel.getMeasuredWidth() * 0.5;
            this.mailPilotLabel.regY = this.mailPilotLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.mailPilotLabel);*/
            //Easy Button
            this.playButton = new objects.Button(400, 280, "easyButton");
            this.playButton.on("click", this.playClicked, this);
            this.game.addChild(this.playButton);
            createjs.Sound.play("introst", { loop: -1 });
            //Hard Button
            this.playhardButton = new objects.Button(400, 360, "hardButton");
            this.playhardButton.on("click", this.playHardClicked, this);
            this.game.addChild(this.playhardButton);
            createjs.Sound.play("introst", { loop: -1 });
            //Manual Button
            this.manualButton = new objects.Button(400, 440, "manualButton");
            this.manualButton.on("click", this.manualBtnClicked, this);
            this.game.addChild(this.manualButton);
            createjs.Sound.play("introst", { loop: -1 });
            // Manual Overlay
            this.manual = new objects.Button(400, 300, "manual");
            this.manual.on("click", this.manualClicked, this);
            this.manual.visible = false;
            this.game.addChild(this.manual);
            createjs.Sound.play("introst", { loop: -1 });
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        Menu.prototype.playClicked = function () {
            this.play = true;
            createjs.Sound.stop();
            constants.DIFFICULTY_HARD = false;
        };
        Menu.prototype.playHardClicked = function () {
            this.play = true;
            createjs.Sound.stop();
            constants.DIFFICULTY_HARD = true;
        };
        Menu.prototype.manualBtnClicked = function () {
            constants.MANUAL = true;
        };
        Menu.prototype.manualClicked = function () {
            constants.MANUAL = false;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype.update = function () {
            this.icen.update();
            if (constants.MANUAL) {
                this.companylogo.visible = false;
                this.gamelogo.visible = false;
                this.playButton.visible = false;
                this.playhardButton.visible = false;
                this.manualButton.visible = false;
                this.manual.visible = true;
            }
            else {
                this.companylogo.visible = true;
                this.gamelogo.visible = true;
                this.playButton.visible = true;
                this.playhardButton.visible = true;
                this.manualButton.visible = true;
                this.manual.visible = false;
            }
            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return Menu;
    })();
    states.Menu = Menu; // Menu Class
})(states || (states = {})); // States Module
//# sourceMappingURL=menu.js.map