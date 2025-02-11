let robot;
let monkey;
let character;

function preload() {
  robot = loadImage("media/robot.png");
  monkey = loadImage("media/monkey.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  // creates robot sprite 
  robotCharacter = new Character(random(80, width-80),random(80, height-80));
  robotCharacter.addAnimation("down", new SpriteAnimation(robot, 6, 5, 6));
  robotCharacter.addAnimation("up", new SpriteAnimation(robot, 0, 5, 6));
  robotCharacter.addAnimation("stand", new SpriteAnimation(robot, 0, 0, 1));
  robotCharacter.currentAnimation = "stand";

  // creates monkey sprite
  monkeyCharacter = new Character(random(80, width-80),random(80, height-80));
  monkeyCharacter.addAnimation("left", new SpriteAnimation(monkey, 6, 5, 6));
  monkeyCharacter.addAnimation("right", new SpriteAnimation(monkey, 0, 5, 6));
  monkeyCharacter.addAnimation("stand", new SpriteAnimation(monkey, 0, 0, 1));
  monkeyCharacter.currentAnimation = "stand";
}

function draw() {
  background(220);

  robotCharacter.draw();
  monkeyCharacter.draw();
}

function keyPressed() {
  robotCharacter.keyPressed();
  monkeyCharacter.keyPressed();
}

function keyReleased() {
  robotCharacter.keyReleased();
  monkeyCharacter.keyReleased();
}

class Character {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          if(this.type === "robot") this.y -= 2;
          break;
        case "down": 
        if(this.type === "robot") this.y += 2;
          break;
        case "left":
          if(this.type === "monkey") this.x -= 2;
          break;
        case "right": 
        if(this.type === "monkey") this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    if(this.type === "robot"){
      if(keyCode === UP_ARROW) this.currentAnimation = "up";
      if(keyCode === DOWN_ARROW) this.currentAnimation = "down";
    } else if (this.type === "monkey") {
      if(keyCode === LEFT_ARROW) this.currentAnimation = "left";
      if(keyCode === RIGHT_ARROW) this.currentAnimation = "right";
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = true;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}