let selectedColor = "black";

function setup() {
  createCanvas(900, 900);
  colorMode(HSB);
  angleMode(DEGREES);
  background(195, 25, 90);

  drawCanvas();
}

function draw(){
  drawPalette(105, 105); // draws color pallette
}

function drawCanvas(){
  fill("white");
  rect(100, 100, 700, 600); // creates blank canvas
}

function drawPalette(x, y){
  let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];

  for(let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    square(x, y + (i * 30), 20);
  }
}

function mousePressed() {
  let palletteX = 105, palletteY = 105;
  let squareSize = 20;
  let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];

  for(let i = 0; i < colors.length; i++) {
    if(mouseX > palletteX && mouseX < palletteX + squareSize && 
      mouseY > palletteY + (i * 30) && mouseY < palletteY + (i * 30) + squareSize){
      selectedColor = colors[i];
      return;
    }
  }
}

function mouseDragged(){
  if(mouseX > 100 && mouseX < 800 && mouseY > 100 && mouseY < 700){
    stroke(selectedColor);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}