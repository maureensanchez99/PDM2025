let robot, monkey, ghost;
let robotCharacter, monkeyCharacter, ghostCharacter;

function preload() {
  robot = loadImage("media/robot.png");
  monkey = loadImage("media/monkey.png");
  ghost = loadImage("media/ghost.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  // creates robot sprite 
  robotCharacter = new Character(random(80, width-80),random(80, height-80), "robot");
  robotCharacter.addAnimation("down", new SpriteAnimation(robot, 6, 5, 6));
  robotCharacter.addAnimation("up", new SpriteAnimation(robot, 0, 5, 6));
  robotCharacter.addAnimation("stand", new SpriteAnimation(robot, 0, 0, 1));
  robotCharacter.currentAnimation = "stand";

  // creates monkey sprite
  monkeyCharacter = new Character(random(80, width-80),random(80, height-80), "monkey");
  monkeyCharacter.addAnimation("left", new SpriteAnimation(monkey, 0, 0, 6));
  monkeyCharacter.addAnimation("right", new SpriteAnimation(monkey, 0, 0, 6));
  monkeyCharacter.addAnimation("stand", new SpriteAnimation(monkey, 0, 0, 1));
  monkeyCharacter.currentAnimation = "stand";

  // creates ghost sprite
  ghostCharacter = new Character(random(80, width-80),random(80, height-80), "ghost");
  ghostCharacter.addAnimation("down", new SpriteAnimation(ghost, 6, 5, 6));
  ghostCharacter.addAnimation("up", new SpriteAnimation(ghost, 0, 5, 6));
  ghostCharacter.addAnimation("stand", new SpriteAnimation(ghost, 0, 0, 1));
  ghostCharacter.currentAnimation = "stand";
}

function draw() {
  background(220);

  robotCharacter.draw();
  monkeyCharacter.draw();
  ghostCharacter.draw();
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    robotCharacter.keyPressed("up");
    ghostCharacter.keyPressed("up");
  } else if (keyCode === DOWN_ARROW){
      robotCharacter.keyPressed("down");
      ghostCharacter.keyPressed("down");
  } else if (keyCode === LEFT_ARROW) {
    monkeyCharacter.keyPressed("left");
  } else if (keyCode === RIGHT_ARROW) {
    monkeyCharacter.keyPressed("right");
  }
}

function keyReleased() {
  if(keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    robotCharacter.keyReleased();
    ghostCharacter.keyReleased();
  } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    monkeyCharacter.keyReleased();
  }
}

class Character {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.currentAnimation = "stand";
    this.animations = {};
    this.facingLeft = false;
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          if(this.type === "robot" || this.type === "ghost") this.y -= 2;
          break;
        case "down": 
        if(this.type === "robot" || this.type === "ghost") this.y += 2;
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
      animation.draw(this.facingLeft);
      pop();
    }
  }

  keyPressed(direction) { 
    if (this.type === "robot" && (direction === "up" || direction === "down")) {
      this.currentAnimation = direction;
    } else if (this.type === "monkey" && (direction === "left" || direction === "right")) {
      if (direction === "left") {
        this.facingLeft = true;
      } else if (direction === "right") {
        this.facingLeft = false;
      }
      this.currentAnimation = direction;
    } else if (this.type === "ghost" && (direction === "up" || direction === "down")) { 
      this.currentAnimation = direction;
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
  }

  draw(flip = false) {
    push();
    if(flip){
      scale(-1, 1);
      image(this.spritesheet, -40, 0, 80, 80, this.u*80, this.v*80, 80, 80);
    } else {
      image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);
    }
    pop();

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}