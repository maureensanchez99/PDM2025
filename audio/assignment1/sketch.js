let startContext, samples, sampler, buton1, button2, button3, button4;

function preload() {
  // sampler = new Tone.Player("media/cat.mp3").toDestination()
  samples = new Tone.Players({
    horror: "media/horror_background.mp3",
    keyboard: "media/mechanical_keyboard.mp3",
    movie: "media/movie_effect.mp3",
    wolf: "media/wolf_howl.mp3"
  }).toDestination()
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
  button1 = createButton("Play Horror Effect");
  button1.position(10, 30);
  button2 = createButton("Play Keyboard");
  button2.position(200, 30);
  button3 = createButton("Play Movie Effect");
  button3.position(10, 60);
  button4 = createButton("Play Wolf Howl");
  button4.position(200, 60);
  button1.mousePressed(() => {samples.player("horror").start()})
  button2.mousePressed(() => {samples.player("keyboard").start()})
  button3.mousePressed(() => {samples.player("movie").start()})
  button4.mousePressed(() => {samples.player("wolf").start()})
  // button1.mousePressed(() => {sampler.start()})
}

function draw() {
  background(220);
}

// function playSample() {
//   sampler.start()
// }

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}