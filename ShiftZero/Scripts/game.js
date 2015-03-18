/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/icen.ts" />
/// <reference path="objects/power.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/playerbulletmanager.ts" />
// Global game Variables
var canvas;
var stage;
var assetLoader;
// Game Objects 
var score;
var icen;
var power;
var pbulletmanager;
var clouds = [];
var ocean;
var manifest = [
    { id: "cloud", src: "assets/images/cloud.png" },
    { id: "power", src: "assets/images/AmmoPick.png" },
    { id: "ocean", src: "assets/images/Ocean_Layer1.png" },
    { id: "clouds", src: "assets/images/Cloud_Layer1.png" },
    { id: "icen", src: "assets/images/Icen.png" },
    { id: "bullet", src: "assets/images/Bullet.png" },
    { id: "manager", src: "assets/images/Manager.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "engine", src: "assets/audio/engines.ogg" },
    { id: "engineslow", src: "assets/audio/engineslow.ogg" },
    { id: "pick", src: "assets/audio/pickup.ogg" },
    { id: "ost1", src: "assets/audio/OST1.ogg" },
    { id: "fire", src: "assets/audio/50cal.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" }
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
    this.score = 0;
    createjs.Sound.play("ost1", { loop: -1 });
    main();
}
// UTILITY METHODS
// DISTANCE CHECKING METHOD
function distance(p1, p2) {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}
// CHECK COLLISION METHOD
function checkCollision(collider) {
    var icenPosition = new createjs.Point(icen.x, icen.y);
    var cloudPosition = new createjs.Point(collider.x, collider.y);
    var theDistance = distance(icenPosition, cloudPosition);
    if (theDistance < ((icen.height * 0.5) + (collider.height * 0.5))) {
        if (collider.isColliding != true) {
            createjs.Sound.play(collider.sound);
            if (!collider.isHarmful && collider.isActive) {
                score += 1;
                console.log("Score: " + score);
            }
        }
        collider.isColliding = true;
    }
    else {
        collider.isColliding = false;
    }
}
function gameLoop() {
    this.document.onkeydown = keyPressed;
    ocean.update();
    power.update();
    icen.update();
    pbulletmanager.update(icen.x, icen.y);
    for (var cloud = 2; cloud >= 0; cloud--) {
        clouds[cloud].update();
        checkCollision(clouds[cloud]);
    }
    checkCollision(power);
    stage.update(); // Refreshes our stage
}
function keyPressed(event) {
    switch (event.keyCode) {
        case 16:
            if (icen.isSlow)
                icen.isSlow = false;
            else
                icen.isSlow = true;
            console.log("Icen is slow: " + icen.isSlow);
            break;
    }
}
// Our Game Kicks off in here
function main() {
    //Ocean object
    ocean = new objects.Ocean();
    stage.addChild(ocean);
    stage.addChild(ocean.secondary);
    //Powerup object
    power = new objects.Power();
    stage.addChild(power);
    //Player Icen object
    icen = new objects.Icen();
    pbulletmanager = new objects.PlayerBulletManager(icen.x, icen.y);
    for (var b = 0; b < 20; b++) {
        pbulletmanager.bullets[b] = new objects.Bullet();
        stage.addChild(pbulletmanager.bullets[b]);
    }
    stage.addChild(icen);
    stage.addChild(pbulletmanager);
    pbulletmanager.addEventListener("pressmove", pbulletmanager.mouseon);
    pbulletmanager.addEventListener("pressup", pbulletmanager.mouseout);
    stage.addChild(ocean.cloudoverlay);
    stage.addChild(ocean.secondarycloudoverlay);
    for (var cloud = 2; cloud >= 0; cloud--) {
        clouds[cloud] = new objects.Cloud();
    }
}
//# sourceMappingURL=game.js.map