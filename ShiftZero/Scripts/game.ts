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




// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;


// Game Objects 
var score: number;
var icen: objects.Icen;
var power: objects.Power;
var clouds: objects.Cloud[] = [];
var ocean: objects.Ocean;

var manifest = [
    { id: "cloud", src: "assets/images/cloud.png" },
    { id: "power", src: "assets/images/AmmoPick.png" },
    { id: "ocean", src: "assets/images/Ocean_Layer1.png" },
    { id: "clouds", src: "assets/images/Cloud_Layer1.png" },
    { id: "icen", src: "assets/images/Icen.png" },
    { id: "plane", src: "assets/images/plane.png" },
    { id: "engine", src: "assets/audio/engines.ogg" },
    { id: "engineslow", src: "assets/audio/engineslow.ogg" },
    { id: "pick", src: "assets/audio/pickup.ogg" },
    { id: "ost1", src: "assets/audio/OST1.ogg" },
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
function distance(p1: createjs.Point, p2: createjs.Point): number {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}

// CHECK COLLISION METHOD
function checkCollision(collider: objects.GameObject) {
    var icenPosition: createjs.Point = new createjs.Point(icen.x, icen.y);
    var cloudPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
    var theDistance = distance(icenPosition, cloudPosition);
    if (theDistance < ((icen.height * 0.5) + (collider.height * 0.5))) {
        if (collider.isColliding != true) {
            createjs.Sound.play(collider.sound);
            if (!collider.isHarmful) {
                score += 1;
                console.log("Score: " + score);
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
    stage.addChild(icen);

    stage.addChild(ocean.cloudoverlay);
    stage.addChild(ocean.secondarycloudoverlay);

    //Cloud object
    for (var cloud = 2; cloud >= 0; cloud--) {
        clouds[cloud] = new objects.Cloud();
        //stage.addChild(clouds[cloud]);
    }



    
    

    
}