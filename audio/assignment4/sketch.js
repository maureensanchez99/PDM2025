// Game states
let GameStates = Object.freeze({ 
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let eggSpritesheet;
let bugs = [];
let bugCount = 10;

const EGG_SIZE = 64;  
  
// Sound variable
let bgm, squishSound, missSound, skitterSound, startSound, endSound;
let skitterLoop, musicLoop;

function preload() {
  gameFont = loadFont("media/PressStart2P-Regular.ttf");
  eggSpritesheet = loadImage("media/egg.png");  

  // Load sound files
  soundFormats("mp3", "wav");
  bgm = loadSound("media/bgm.mp3");
  squishSound = loadSound("media/squish.wav");
  missSound = loadSound("media/miss.wav");
  skitterSound = loadSound("media/skitter.wav");
  startSound = loadSound("media/start.wav");
  endSound = loadSound("media/end.wav");
}

function setup() {
  createCanvas(600, 600);
  textFont(gameFont);
  textSize(12);
  imageMode(CENTER);

  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug(random(50, width - 50), random(50, height - 50)));
  }

  // Background music setup
  bgm.setLoop(true);
  bgm.setVolume(0.5);

  // Bug skittering loop
  skitterLoop = new p5.Part();
  let skitterPhrase = new p5.Phrase('skitter', () => {
    if (random() > 0.7) skitterSound.play(); // Random chance to play skitter
  }, [1, 0, 0, 1, 0, 1, 0, 0]); // Custom rhythm pattern
  skitterLoop.addPhrase(skitterPhrase);
  skitterLoop.setBPM(120);
}

function draw() {
  background(220);

  switch (gameState) {
    case GameStates.START:
      displayStartScreen();
      break;
    case GameStates.PLAY:
      playGame();
      break;
    case GameStates.END:
      displayEndScreen();
      break;
  }
}

function displayStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Squish the Eggs!", width / 2, height / 2 - 30);
  text("Press ENTER to Start", width / 2, height / 2);
}

function playGame() {
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, textPadding, textPadding);
  textAlign(RIGHT, TOP);
  text(`Time: ${Math.ceil(time)}`, width - textPadding, textPadding);

  time -= deltaTime / 1000;

  for (let bug of bugs) {
    bug.update();
    bug.display();
  }

  // Increase music speed as time runs out
  let speedFactor = map(time, 30, 0, 1, 1.5);
  bgm.rate(speedFactor);

  if (time <= 0) {
    endGame();
  }
}

function displayEndScreen() {
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Game Over!", width / 2, height / 2 - 40);
  text(`Score: ${score}`, width / 2, height / 2 - 10);
  text(`High Score: ${highScore}`, width / 2, height / 2 + 20);
  text("Press ENTER to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if ((gameState === GameStates.START || gameState === GameStates.END) && keyCode === ENTER) {
    resetGame();
    gameState = GameStates.PLAY;
    startSound.play();
    bgm.play();
    skitterLoop.loop();
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    let hit = false;
    for (let bug of bugs) {
      if (!bug.isSquished && bug.isClicked(mouseX, mouseY)) {
        bug.squish();
        score++;
        increaseBugSpeed();
        squishSound.play();
        hit = true;
        break;
      }
    }
    if (!hit) {
      missSound.play(); // Play "miss" sound if user clicks and misses a bug
    }
  }
}

function resetGame() {
  score = 0;
  time = 30;
  bugs = [];
  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug(random(50, width - 50), random(50, height - 50)));
  }
  bgm.rate(1); // Reset music speed
}

function endGame() {
  gameState = GameStates.END;
  if (score > highScore) highScore = score;
  bgm.stop();
  skitterLoop.stop();
  endSound.play();
}

function increaseBugSpeed() {
  for (let bug of bugs) {
    bug.speed *= 1.25;
  }
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 2);
    this.direction = p5.Vector.random2D();
    this.frame = 0;
    this.isSquished = false;
    this.frameInterval = 8;
    this.frameCounter = 0;
  }

  update() {
    if (!this.isSquished) {
      this.x += this.direction.x * this.speed;
      this.y += this.direction.y * this.speed;

      if (this.x < EGG_SIZE / 2 || this.x > width - EGG_SIZE / 2) this.direction.x *= -1;
      if (this.y < EGG_SIZE / 2 || this.y > height - EGG_SIZE / 2) this.direction.y *= -1;

      this.frameCounter++;
      if (this.frameCounter % this.frameInterval === 0) {
        this.frame = (this.frame + 1) % 7;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.isSquished) {
      image(eggSpritesheet, 0, 0, EGG_SIZE, EGG_SIZE, 0, 32, 32, 32);
    } else {
      let angle = atan2(this.direction.y, this.direction.x);
      rotate(angle + PI / 2);
      image(eggSpritesheet, 0, 0, EGG_SIZE, EGG_SIZE, this.frame * 32, 0, 32, 32);
    }

    pop();
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < EGG_SIZE / 2;
  }

  squish() {
    this.isSquished = true;
    this.speed = 0;
  }
}