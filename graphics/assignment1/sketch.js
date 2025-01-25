function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw(){
  const sectionH = height / 4;  // creates evenly distributed height for each img

  drawImg1(0, 0, width, sectionH); // creates img 1
  drawImg2(0, sectionH, width, sectionH); // creates img 2
  drawImg3(0, sectionH*2, width, sectionH); // creates img 3
  drawImg4(0, sectionH*3, width, sectionH); // creates img 4
}

function drawImg1(x, y, w, h) {
  push();  // starts a new img in this section
  translate(x, y);  // starting point for img
  fill(111, 69, 91);  // background color
  rect(0, 0, w, h);  // shape for section

  // creating circle
  fill("white");
  circle(0, 0, 50);

  // creating square
  fill("white");
  square(w/4, h/4, 50);
  pop();  // ends the img in this section
}

function drawImg2(x, y, w, h) {
  push();  // starts a new img in this section
  translate(x, y); 
  fill("white");  // background color
  rect(0, 0, w, h);  // shape for section


  pop();  // ends the img in this section
}

function drawImg3(x, y, w, h) {
  push();  // starts a new img in this section
  translate(x, y); 
  fill("black");  // background color
  rect(0, 0, w, h);  // shape for section


  pop();  // ends the img in this section
}

function drawImg4(x, y, w, h) {
  push();  // starts a new img in this section
  translate(x, y); 
  fill(242, 96, 42);  // background color
  rect(0, 0, w, h);  // shape for section


  pop();  // ends the img in this section
}