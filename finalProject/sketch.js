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

let cloudX = 0;  
let cloudSpeed = 0.5; 
let clouds = [];
let cloudsOn = false;   

let ambientSynth, ambientLoop;
let isAmbientPlaying = false;

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

  for (let i = 0; i < 5; i++) {
    let y = random(50, 200);
    clouds.push({
      x: random(-200, width),
      y: y,
      speed: random(0.1, 0.3), // slower clouds
      size: random(0.8, 1.5),
      alpha: map(y, 50, 200, 200, 100) // higher clouds are more transparent
    });
  }
  
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
      let parts = str.trim().split(",");
      if (parts.length === 2) {
        let lightVal = Number(parts[0]);
        let buttonVal = Number(parts[1]);
    
        if (!isNaN(lightVal)) {
          let brightness = map(lightVal, 100, 950, 0, 255);
          let fixedHue = 170;
          let saturation = 200;
          backgroundColor = color(fixedHue, saturation, brightness);
        }
    
        // buttonVal: 0 = pressed, 1 = not pressed
        cloudsOn = buttonVal === 0;
      }
    }
    
  }
  if (cloudsOn) {
    drawClouds();
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

function drawClouds() {
  push();
  noStroke();

  for (let cloud of clouds) {
    let { x, y, size, speed, alpha } = cloud;
    // Cloud shape
    ellipse(x, y, 80 * size, 50 * size);
    ellipse(x + 40 * size, y, 80 * size, 50 * size);
    ellipse(x + 20 * size, y - 20 * size, 80 * size, 50 * size);

    cloud.x += speed;

    if (cloud.x > width + 100) {
      cloud.x = -150;
    }
  }
  pop();
}