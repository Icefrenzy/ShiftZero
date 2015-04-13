/// <reference path="../objects/constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/power.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/icen.ts" />
/// <reference path="../objects/abyssal1.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />

/// <reference path="../objects/scoreboard.ts" />

module states {
    // MENU STATE CLASS
    export class Menu {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Ocean;
        public gamelogo: createjs.Bitmap;
        public companylogo: createjs.Bitmap;
        public mailPilotLabel: objects.Label;
        public playButton: objects.Button;
        public play: boolean = false;
        public icen: objects.Icen;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            

            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);
            this.game.addChild(this.ocean.secondary);
            this.game.addChild(this.ocean.cloudoverlay);
            this.game.addChild(this.ocean.secondarycloudoverlay);

            this.gamelogo = new createjs.Bitmap(assetLoader.getResult("shiftlogo"));
            this.gamelogo.x = this.gamelogo.x * 0.5 + 150;
            this.gamelogo.y = this.gamelogo.y * 0.5;
            this.game.addChild(this.gamelogo);

            this.companylogo = new createjs.Bitmap(assetLoader.getResult("companylogo"));
            this.companylogo.x = this.companylogo.x * 0.5+600;
            this.companylogo.y = this.companylogo.y * 0.5+480;
            this.game.addChild(this.companylogo);

            this.icen = new objects.Icen();
            this.game.addChild(this.icen);


            //Game Over Label
            /*this.mailPilotLabel = new objects.Label(320, 40, "Shift Zero");
            this.mailPilotLabel.font = "60px Consolas";
            this.mailPilotLabel.regX = this.mailPilotLabel.getMeasuredWidth() * 0.5;
            this.mailPilotLabel.regY = this.mailPilotLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.mailPilotLabel);*/


            //Play Button
            this.playButton = new objects.Button(320, 280, "easyButton");
            this.playButton.on("click", this.playClicked, this);
            this.game.addChild(this.playButton);
            createjs.Sound.play("introst", { loop: -1 });


            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public playClicked() {
            this.play = true;
            createjs.Sound.stop();
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();
            this.icen.update();

            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Menu Class


} // States Module