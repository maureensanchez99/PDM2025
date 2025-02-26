let startContext, samples, sampler, buton1, button2, button3, button4;
let samplerSamples, delTimeSlider, feedbaclSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5; 

function preload() {
  samples = new Tone.Players({
    horror: "media/audio/horror_background.mp3",
    keyboard: "media/audio/mechanical_keyboard.mp3",
    movie: "media/audio/movie_effect.mp3",
    wolf: "media/audio/wolf_howl.mp3"
  }).connect(del);
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

  // sampler
  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(100, 150);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(300, 150);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(100, 300);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(300, 300);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(62, 201, 104);
  text("Delay Time: " + delTimeSlider.value(), 100, 140);
  text("Feedback Amount: " + feedbackSlider.value(), 300, 140);
  text("Distortion Amount: " + distSlider.value(), 100, 290);
  text("Reverb Wet Amount: " + wetSlider.value(), 300, 290)
}

function playSample(name) {
  Tone.start();  
  samples.player(name).start();
}

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}