/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="objects/constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/icen.ts" />
/// <reference path="objects/power.ts" />
/// <reference path="objects/abyssal1.ts" />
/// <reference path="objects/abyssal2.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/playerbulletmanager.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="states/gameplay.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/menu.ts" />
// Global game Variables
var canvas;
var stage;
var assetLoader;
var stats = new Stats();
var currentScore = 0;
var highScore = 0;
// Game State Variables
var currentState;
var currentStateFunction;
var stateChanged = false;
var gamePlay;
var gameOver;
var menu;
var manifest = [
    { id: "abyss1", src: "assets/images/Abyss1.png" },
    { id: "abyss2", src: "assets/images/Abyss2.png" },
    { id: "power", src: "assets/images/AmmoPick.png" },
    { id: "ocean", src: "assets/images/Ocean_Layer1.png" },
    { id: "clouds", src: "assets/images/Cloud_Layer1.png" },
    { id: "icen", src: "assets/images/Icen.png" },
    { id: "easyButton", src: "assets/images/EasyBtn.png" },
    { id: "hardButton", src: "assets/images/HardBtn.png" },
    { id: "manualButton", src: "assets/images/ManualBtn.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainButton.png" },
    { id: "companylogo", src: "assets/images/company.png" },
    { id: "bullet", src: "assets/images/Bullet.png" },
    { id: "bullet2", src: "assets/images/Bullet2.png" },
    { id: "manager", src: "assets/images/Manager.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "engineslow", src: "assets/audio/engineslow.ogg" },
    { id: "pick", src: "assets/audio/pickup.ogg" },
    { id: "ost1", src: "assets/audio/ost1.ogg" },
    { id: "introst", src: "assets/audio/intro.ogg" },
    { id: "overost", src: "assets/audio/gameover.ogg" },
    { id: "fire", src: "assets/audio/50cal.ogg" },
    { id: "hurt", src: "assets/audio/hurt.ogg" },
    { id: "bullethurt", src: "assets/audio/bullethit.ogg" },
    { id: "shiftlogo", src: "assets/images/ShiftZeroLogo.png" },
    { id: "wallpaper", src: "assets/images/BG.png" },
    { id: "manual", src: "assets/images/manual.png" }
];
function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function
    assetLoader.loadManifest(manifest);
}
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
function setupStats() {
    stats.setMode(0);
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    //document.body.appendChild(stats.domElement);
}
function gameLoop() {
    stats.begin();
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
    stats.end();
}
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;
        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}
//# sourceMappingURL=game.js.map