let port;
let connectButton;
let rSlider, gSlider, bSlider;

function setup() {
  createCanvas(400, 400);

  // Create Connect Button
  connectButton = createButton('Connect');
  connectButton.position(10, 10);
  connectButton.mousePressed(connect);

  // Create RGB sliders
  rSlider = createSlider(0, 255, 127);
  rSlider.position(10, 50);
  gSlider = createSlider(0, 255, 127);
  gSlider.position(10, 80);
  bSlider = createSlider(0, 255, 127);
  bSlider.position(10, 110);

  noStroke();

  port = createSerial();
}

function draw() {
  background(220);

  // Get RGB values from sliders
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();

  // Draw current color
  fill(r, g, b);
  ellipse(width / 2, height / 2, 100);

  // Send RGB values to Arduino if port is open
  if (port.opened()) {
    let msg = `${r} ${g} ${b}\n`;
    port.write(msg);
  }

  // Read incoming serial data (if any)
  let str = port.readUntil('\n');
  if (str !== "") {
    console.log("Received from Arduino:", str.trim());
  }

  // Draw slider labels
  fill(0);
  text("Red", rSlider.x * 2 + rSlider.width, 65);
  text("Green", gSlider.x * 2 + gSlider.width, 95);
  text("Blue", bSlider.x * 2 + bSlider.width, 125);
}

function connect() {
  port.open('Arduino', 9600);
}
