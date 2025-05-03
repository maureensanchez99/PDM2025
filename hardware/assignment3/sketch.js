let port;
let connectButton;
let rSlider, gSlider, bSlider;
let backgroundColor;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 255, 255);

  connectButton = createButton('Connect');
  connectButton.position(10, 10);
  connectButton.mousePressed(connect);

  rSlider = createSlider(0, 255, 127);
  rSlider.position(10, 50);
  gSlider = createSlider(0, 255, 127);
  gSlider.position(10, 80);
  bSlider = createSlider(0, 255, 127);
  bSlider.position(10, 110);

  noStroke();
  backgroundColor = color(0, 0, 220);

  port = createSerial();
}

function draw() {
  background(backgroundColor);

  // Send RGB to Arduino
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();

  if (port.opened()) {
    let msg = `${r} ${g} ${b}\n`;
    port.write(msg);
  }

  // Read light sensor value from Arduino
  let str = port.readUntil('\n');
  if (str !== "") {
    let lightVal = Number(str.trim());
    if (!isNaN(lightVal)) {
      // Set background hue based on light level
      let hue = map(lightVal, 0, 1023, 240, 0);        // hue: blue to red
      let brightness = map(lightVal, 0, 1023, 50, 255); // low light = dark
      backgroundColor = color(hue, 180, brightness);
    }
  }
  
  fill(0);
  text("Red", rSlider.x * 2 + rSlider.width, 65);
  text("Green", gSlider.x * 2 + gSlider.width, 95);
  text("Blue", bSlider.x * 2 + bSlider.width, 125);
}

function connect() {
  port.open('Arduino', 9600);
}