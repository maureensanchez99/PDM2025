let punchImage, afterImage;

function preload() {
  punchImage = loadImage('media/punch.png');
  afterImage = loadImage('media/after.png');
}

function setup() {
  createCanvas(800, 600);
  console.log("Setup function is running");
}

function draw() {
  console.log("Draw function is running");
  background(punchImage);

  // Display the afterImage while the mouse is pressed
  if (mouseIsPressed) {
    image(afterImage, 0, 0, 800, 600);
  }
}

function mousePressed() {
  console.log("Mouse pressed");
}