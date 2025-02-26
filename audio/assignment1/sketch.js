let startContext, samples, sampler, buton1, button2, button3, button4;
let samplerSamples, delTimeSlider, feedbaclSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5; 

function preload() {
  samples = new Tone.Players({
    horror: "media/audio/horror_background.mp3",
    keyboard: "media/audio//mechanical_keyboard.mp3",
    movie: "media/audio//movie_effect.mp3",
    wolf: "media/audio//wolf_howl.mp3"
  }).toDestination()

  samplerSamples = new Tone.Players({
    horror: "media/audio/horror_background.mp3",
    keyboard: "media/audio//mechanical_keyboard.mp3",
    movie: "media/audio//movie_effect.mp3",
    wolf: "media/audio//wolf_howl.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(600, 500);
  // created buttons to play audio effects
  button1 = createButton("Play Horror Effect");
  button1.position(100, 50);
  button2 = createButton("Play Keyboard");
  button2.position(300, 50);
  button3 = createButton("Play Movie Effect");
  button3.position(100, 80);
  button4 = createButton("Play Wolf Howl");
  button4.position(300, 80);
  button1.mousePressed(() => {samples.player("horror").start()})
  button2.mousePressed(() => {samples.player("keyboard").start()})
  button3.mousePressed(() => {samples.player("movie").start()})
  button4.mousePressed(() => {samples.player("wolf").start()})
}

function draw() {
  background(62, 201, 104);
}

function playSample() {
  sampler.start()
}

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}