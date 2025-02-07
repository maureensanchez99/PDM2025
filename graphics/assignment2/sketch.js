let selectedColor = "black";

function setup() {
  createCanvas(900, 900);
  colorMode(HSB);
  angleMode(DEGREES);
  background(195, 25, 90);

  drawCanvas();
}

function draw(){
  drawPalette(105, 105); // draws color palette
}

function drawCanvas(){
  fill("white");
  rect(100, 100, 700, 600); // creates blank canvas
}

function drawPalette(x, y){
  let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];
  stroke(0);
  strokeWeight(1);
  for(let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    square(x, y + (i * 30), 20);
  }
}

function mousePressed() {
  let paletteX = 105, paletteY = 105;
  let squareSize = 20;
  let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];

  for(let i = 0; i < colors.length; i++) {
    if(mouseX > paletteX && mouseX < paletteX + squareSize && 
      mouseY > paletteY + (i * 30) && mouseY < paletteY + (i * 30) + squareSize){
      selectedColor = colors[i];
      return;
    }
  }
}

function mouseDragged(){
  let canvasLeft = 100, canvasRight = 800;
  let canvasTop = 100, canvasBottom = 700;
  let paletteLeft = 105, paletteRight = 125;
  let paletteTop = 105, paletteBottom = 405;

  let x1 = constrain(mouseX, canvasLeft, canvasRight);
  let y1 = constrain(mouseY, canvasTop, canvasBottom);
  let x2 = constrain(pmouseX, canvasLeft, canvasRight);
  let y2 = constrain(pmouseY, canvasTop, canvasBottom);

  let insidePalette = (mouseX > paletteLeft && mouseX < paletteRight && mouseY > paletteTop && mouseY < paletteBottom);

  if(!insidePalette){
    stroke(selectedColor);
    strokeWeight(5);
    line(x2, y2, x1, y1);
  }
}