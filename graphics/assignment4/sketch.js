let GameStates = Object.freeze((
  START: "start",
  PLAY: "play",
  END: "end"
));

let gameState = GameStates.START;
let score = 0;
let time = 10;
let textPadding = 15;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  switch(gameState){
    case GameStates.START:

      break;
    case GameStates.PLAY:

      break;
    case GameStates.END:

      break;
  }
}
