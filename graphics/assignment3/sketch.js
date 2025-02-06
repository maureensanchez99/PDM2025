let cyclops;
// can use p5 play library to use for animations, caution book code may be outdated with old version 
// we can use code from class as starter code

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

function keyPressed(){

}

class Character {
  constructor(x, y) {
    switch(keyCode){
      case UP_ARROW:
        character.currentAnimation = "up";
        break;
    }
  }
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