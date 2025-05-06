let port;
let connectButton, lightningButton;
let backgroundColor;
let playLightning = false;
let thunderNoise, thunderEnv;
let lastLightningSoundTime = 0;
const lightningSoundInterval = 1000;
let eggSpriteSheet;
let eggX = 0;  
let eggSpeed = 0.75; 
let eggFrame = 0;  
let eggFrameInterval = 8;  
let eggFrameCounter = 0;  
const EGG_FRAMES = 7;
const EGG_SIZE = 64; 

function preload() {
  eggSpritesheet = loadImage("media/egg.png");  
}

function setup() {
  createCanvas(700, 500);
  colorMode(HSB, 255);
  angleMode(DEGREES);

  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);

  backgroundColor = color(140, 206, 230);
  let originalEggSpeed = eggSpeed; // stores the original speed of the egg

  lightningButton = createButton("Lightning");
  lightningButton.position(20, 600);
  lightningButton.mousePressed(() => { 
    playLightning = !playLightning; 
    eggSpeed = playLightning ? originalEggSpeed * 3 : originalEggSpeed; // Reset to original speed when turned off
  });
}

function draw() {
  background(backgroundColor);
  drawGround();
  drawLightning();
  drawEgg();
  if (frameCount % 6 === 0) {
    if (port.opened()) {
      let msg = playLightning ? "1\n" : "0\n";  
      port.write(msg);
    }
  
    let str = port.readUntil('\n');
    if (str !== "") {
      let lightVal = Number(str.trim());
      if (!isNaN(lightVal)) {
        let hue = map(lightVal, 0, 132, 0, 360);
        backgroundColor = color(hue, 255, 255);
      }
    }
  }
  
}

function drawGround() {
  push();
  fill(30, 200, 100);  
  rect(0, height - 50, width, 50); 
  pop();
}

function drawLightning() {
  if (playLightning) {
    push();
    stroke(60, 255, 255); 
    strokeWeight(4);

    let x = random(0, width); 
    let y = 0; 

    // generate random lightning segments
    for (let i = 0; i < 10; i++) {
      let newX = x + random(-20, 20); 
      let newY = y + random(20, 50);  
      line(x, y, newX, newY);  
      x = newX;
      y = newY;

      // stops if lightning reaches the bottom of the canvas
      if (y > height) break;
    }
    pop();
  }
}

function connectToSerial() {
  port.open('Arduino', 9600);
}

function drawEgg() {
  push();

  // flips the egg sprite if moving left
  if (eggSpeed < 0) {
    translate(eggX + EGG_SIZE / 2, height - 50 - EGG_SIZE / 2);  
    scale(-1, 1);  
    translate(-EGG_SIZE / 2, -EGG_SIZE / 2);  
  } else {
    translate(eggX, height - 50 - EGG_SIZE);  
  }

  // calculates the current frame of the sprite sheet
  let sx = eggFrame * 32;  
  let sy = 0; 

  // draws the current frame of the egg sprite
  image(eggSpritesheet, 0, 0, EGG_SIZE, EGG_SIZE, sx, sy, 32, 32);

  pop();

  // updates the egg's position
  eggX += eggSpeed;

  // reverses direction if the egg reaches the edges of the canvas
  if (eggX <= 0 || eggX + EGG_SIZE >= width) {
    eggSpeed *= -1;
  }

  // updates the animation frame
  eggFrameCounter++;
  if (eggFrameCounter % eggFrameInterval === 0) {
    eggFrame = (eggFrame + 1) % EGG_FRAMES; // loops through the frames
  }
}