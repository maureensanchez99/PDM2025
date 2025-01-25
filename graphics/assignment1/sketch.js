function setup(){
  createCanvas(1000, 1000);
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
  const sectionW = width / 2;
  push();  // starts a new img in this section
  translate(x, y);  // starting point for img
  fill(111, 69, 91);  // background color
  rect(0, 0, w, h);  // shape for section

  // creating circle
  fill("white");
  circle(sectionW - sectionW / 5, h / 2, 200);

  // creating square
  fill("white");
  square(sectionW + sectionW / 5, h / 2 - 100, 200);
  pop();  // ends the img in this section
}

function drawImg2(x, y, w, h) {
  push();  // starts a new img in this section
  translate(x, y); 
  fill("white");  // background color
  rect(0, 0, w, h);  // shape for section
  noStroke();  // removes stroke from shape

  // creating top circle
  fill(346, 58, 100, 0.5);
  circle(w/2, h/3, 125);

  // creating right circle
  fill(111, 69, 91, 0.5);
  circle(w/2 + w/20, h/3 + h/4, 125);

  // creating left circle
  fill(240, 58, 92, 0.5);
  circle(w/2 - w/20, h/3 + h/4, 125);
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
  stroke("white");
  strokeWeight(5);

  fill("green");
  circle(w/2, h/2, 150);

  fill("red");
  beginShape();
  vertex(50, 50);
  endShape(CLOSE);
  pop();  // ends the img in this section
}