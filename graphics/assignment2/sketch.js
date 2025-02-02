function setup() {
  createCanvas(900, 900);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(195, 25, 90);

  drawCanvas();
}

function drawCanvas(){
  push(); // starts the img
  rect(100, 100, 700, 600);
  fill("white");
  drawPalette(105, 105);
  push(); // ends the img in this section
  if (mousePressed) {

  } else {
    
  }
}

function drawPalette(x, y){
  push();

  fill("red");
  square(x, y, 20);
  fill("orange");
  square(x, y + 30, 20);
  fill("yellow");
  square(x, y + 60, 20);
  fill("green");
  square(x, y + 90, 20);
  fill("cyan");
  square(x, y + 120, 20);
  fill("blue");
  square(x, y + 150, 20);
  fill("magenta");
  square(x, y + 180, 20);
  fill("brown");
  square(x, y + 210, 20);
  fill("white");
  square(x, y + 240, 20);
  fill("black");
  square(x, y + 270, 20);
  push();
  fill("white");
}

function mousePressed() {

}