/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="objects/gameobject.ts" />

/// <reference path="objects/icen.ts" />
/// <reference path="objects/power.ts" />
/// <reference path="objects/abyssal1.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/playerbulletmanager.ts" />




// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;


// Game Objects 
var score: number;
var icen: objects.Icen;
var power: objects.Power;
var pbulletmanager: objects.PlayerBulletManager;
var abyssal: objects.Abyssal[] = [];
var ocean: objects.Ocean;
var scoretext: createjs.Text;

var manifest = [
    { id: "abyss1", src: "assets/images/Abyss1.png" },
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
    { id: "hurt", src: "assets/audio/hurt.ogg" }
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
function distance(p1: createjs.Point, p2: createjs.Point): number {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}

// CHECK COLLISION METHOD
function checkCollision(collider: objects.GameObject) {
    var icenPosition: createjs.Point = new createjs.Point(icen.x, icen.y);
    var abyssPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
    var theDistance = distance(icenPosition, abyssPosition);
    if (theDistance < ((icen.height * 0.5) + (collider.height * 0.5))) {
        if (collider.isColliding != true) {
            createjs.Sound.play(collider.sound);
            if (!collider.isHarmful && collider.isActive) {
                score += 1;
                console.log("Score: " + score);
                scoretext.text = "Score: " + score;
            }
            if (collider.isHarmful && collider.isActive) {
                console.log("Player is hit!");
            }
        }
        collider.isColliding = true;
    } else {
        collider.isColliding = false;
    }
}





function gameLoop() {
    this.document.onkeydown = keyPressed;

    ocean.update();

    power.update();

    icen.update();

    pbulletmanager.update(icen.x,icen.y);

    for (var abyss = 2; abyss >= 0; abyss--) {
        abyssal[abyss].update();

        checkCollision(abyssal[abyss]);
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

    

    //Enemy object
    for (var abyss = 2; abyss >= 0; abyss--) {
        abyssal[abyss] = new objects.Abyssal();
        stage.addChild(abyssal[abyss]);
    }

    stage.addChild(ocean.cloudoverlay);
    stage.addChild(ocean.secondarycloudoverlay);

    scoretext= new createjs.Text("Score: " + score, "26px Arial", "#FFFF00");
    stage.addChild(scoretext);
    scoretext.x = 100;
    scoretext.y = 50;
}