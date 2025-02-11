let GameStates = Object.freeze((
  START: "start",
  PLAY: "play",
  END: "end"
));

let gameState = GameStates.START;

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
