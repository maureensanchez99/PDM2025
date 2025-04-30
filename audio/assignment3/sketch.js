let punchImage, afterImage;
let synth, noise, filt, rev, dist, ampEnv;
let lfo;

function preload() {
  punchImage = loadImage('media/punch.png');
  afterImage = loadImage('media/after.png');
}

function setup() {
  createCanvas(800, 600);
  console.log("Setup function is running");

  // effects
  filt = new Tone.Filter(200, "lowpass").toDestination();  
  rev = new Tone.Reverb(4).connect(filt);  
  dist = new Tone.Distortion(0.4).connect(rev);  

  // monophonic synth
  synth = new Tone.Synth({
    oscillator: { type: 'triangle' }, 
    envelope: { attack: 0.05, decay: 0.3, sustain: 0.5, release: 1.0 }  
  }).connect(dist);

  // noise generator
  ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.5,
    sustain: 0,
    release: 1.0  
  }).toDestination();
  noise = new Tone.Noise('brown').start().connect(ampEnv);  

  // LFO for modulation
  lfo = new Tone.LFO(2, 100, 400).start(); 
  lfo.connect(filt.frequency);
}

function draw() {
  console.log("Draw function is running");
  background(punchImage);

  // makes the afterImage appear while the mouse is pressed
  if (mouseIsPressed) {
    image(afterImage, 0, 0, 800, 600);
  }
}

function mousePressed() {
  console.log("Mouse pressed");

  // Trigger the synth and noise
  synth.triggerAttackRelease("C2", 1.0);  
  ampEnv.triggerAttackRelease(1.0);  
}