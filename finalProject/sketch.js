let port;
let connectButton;
let backgroundColor;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 255);

  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);
}

function draw() {
  background(backgroundColor);

  if (port.opened()) {
    let msg = `${r} ${g} ${b}\n`;
    port.write(msg);
  }

  // Read light sensor value from Arduino
  let str = port.readUntil('\n');
  if (str !== "") {
    let lightVal = Number(str.trim());
    if (!isNaN(lightVal)) {
      let hue = map(val, 0, 132, 0, 360);
      backgroundColor = color(hue, 255, 255);
    }
  }
}

function connectToSerial() {
  port.open('Arduino', 9600);
}