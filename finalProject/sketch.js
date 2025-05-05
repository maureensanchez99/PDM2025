let port;
let connectButton, lightningButton;
let backgroundColor;
let playLightning = false;

function setup() {
  createCanvas(700, 500);
  colorMode(HSB, 255);
  angleMode(DEGREES);

  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);

  backgroundColor = color(140, 206, 230);

  lightningButton = createButton("Start Lightning");
  lightningButton.position(20,600);
  lightningButton.mousePressed(() => { playLightning = !playLightning; });
}

function draw() {
  background(backgroundColor);

  if (port.opened()) {
    let msg = playLightning ? "1\n" : "0\n";  
    port.write(msg);
  }
  
  drawGround();
  drawLightning();

  // Read light sensor value from Arduino
  let str = port.readUntil('\n');
  /*if (str !== "") {
    let lightVal = Number(str.trim());
    if (!isNaN(lightVal)) {
      let hue = map(val, 0, 132, 0, 360);
      backgroundColor = color(hue, 255, 255);
    }
  }*/
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