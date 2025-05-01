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
let backgroundImage;
let bugs = [];
let bugCount = 10;
let squishSound;
let backgroundNoise;

const EGG_SIZE = 64;
let bugSpeedMultiplier = 1;

function preload() {
  gameFont = loadFont("media/PressStart2P-Regular.ttf");
  eggSpritesheet = loadImage("media/egg.png");
  backgroundImage = loadImage("media/bg.jpg");

  if (typeof Tone !== "undefined") {
    squishSound = new Tone.Player("media/audio/egg_cracking.mp3", () => {
      console.log("Squish sound loaded");
    }).toDestination();

    backgroundNoise = new Tone.Player("media/audio/clown_jingle.mp3", () => {
      console.log("Background noise loaded");
    }).toDestination();
  }
}

function setup() {
  createCanvas(600, 600);
  textFont(gameFont);
  textSize(12);
  imageMode(CENTER);

  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug(random(50, width - 50), random(50, height - 50)));
  }
}

function draw() {
  image(backgroundImage, width / 2, height / 2, width, height);

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

function keyPressed() {
  if ((gameState === GameStates.START || gameState === GameStates.END) && keyCode === ENTER) {
    if (typeof Tone !== "undefined" && Tone.context.state !== "running") {
      Tone.start().then(() => {
        if (backgroundNoise && backgroundNoise.state !== "started") {
          backgroundNoise.loop = true;
          backgroundNoise.start();
        }
      });
    } else if (backgroundNoise && backgroundNoise.state !== "started") {
      backgroundNoise.loop = true;
      backgroundNoise.start();
    }

    resetGame();
    gameState = GameStates.PLAY;
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let bug of bugs) {
      if (!bug.isSquished && bug.isClicked(mouseX, mouseY)) {
        if (squishSound) {
          if (squishSound.state === "started") {
            squishSound.stop();
          }
          squishSound.start();
        }
        bug.squish();
        score++;
        increaseBugSpeed();
        break;
      }
    }
  }
}

function resetGame() {
  score = 0;
  time = 30;
  bugSpeedMultiplier = 1;
  bugs = [];
  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug(random(50, width - 50), random(50, height - 50)));
  }

  if (backgroundNoise) {
    backgroundNoise.playbackRate = 1; // Reset music speed
  }
}

function increaseBugSpeed() {
  bugSpeedMultiplier *= 1.25;

  for (let bug of bugs) {
    bug.speed *= 1.25;
  }

  if (backgroundNoise) {
    backgroundNoise.playbackRate = bugSpeedMultiplier;
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

  if (time <= 0) {
    gameState = GameStates.END;
    if (score > highScore) highScore = score;
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