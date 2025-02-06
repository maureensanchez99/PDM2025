let cyclops;

// to load images before the program is run
// make sure to have some sort of media uploaded to folder
function preload(){
  cyclops = loadImage('media/robot.png');
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  animation = new SpriteAnimation(cyclops, 5, 5, 6);
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.frameCount = 0;
  }

  draw(){
    image(this.spritesheet, 0, 0, 80, 80, 0, 0, this.u * 80, this.v * 80);

    this.frameCount++;
    if(){

    }
  }
}