let synth, polySynth, noise, filt, rev, dist;
let ampEnv;
let activeKey = null;
let filterSlider, reverbSlider, distSlider;
let startButton;

let keyNotes = {
  'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4',
  'g': 'G4', 'h': 'A4', 'j': 'B4', 'k': 'C5'
};

let keyNotesPoly = {
  'q': 'D4', 'w': 'F4', 'e': 'A4'
};

function setup() {
  createCanvas(windowWidth, 400);

  // Create the "Start Audio" button
  startButton = createButton("Start Audio");
  startButton.position(width / 2 - 50, height / 2 - 20);
  startButton.mousePressed(startAudio);

  textSize(16);
}
 
function startAudio() {
  // Remove button after clicking
  startButton.remove();

  // Effects
  filt = new Tone.Filter(1500, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  dist = new Tone.Distortion(0.2).connect(rev);

  // Monophonic Synth
  synth = new Tone.Synth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.3 }
  }).connect(dist);

  // Polyphonic Synth
  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    oscillator: { type: 'square' },
    envelope: { attack: 0.1, decay: 0.1, sustain: 1, release: 0.1 }
  });

  // Noise Generator
  ampEnv = new Tone.AmplitudeEnvelope({ attack: 0.1, decay: 0.5, sustain: 0, release: 0.1 }).toDestination();
  noise = new Tone.Noise('pink').start().connect(ampEnv);

  // UI Sliders
  filterSlider = createSlider(200, 5000, 1500, 10);
  filterSlider.position(50, 300);
  filterSlider.input(() => filt.frequency.value = filterSlider.value());

  reverbSlider = createSlider(0, 10, 2, 0.1);
  reverbSlider.position(250, 300);
  reverbSlider.input(() => rev.decay = reverbSlider.value());

  distSlider = createSlider(0, 1, 0.2, 0.01);
  distSlider.position(450, 300);
  distSlider.input(() => dist.distortion = distSlider.value());
}

function draw() {
  background(30);
  fill(255);
  
  if (!synth) {
    text("Press 'Start Audio' before using keys!", width / 2 - 100, height / 2 - 40);
  } else {
    text("Keys A–K = Play Synth, QWE = Polyphonic, Z = Noise", 50, 50);
    text("Filter Cutoff", 50, 280);
    text("Reverb Decay", 250, 280);
    text("Distortion", 450, 280);

    if (activeKey) {
      textSize(32);
      text("Playing: " + activeKey.toUpperCase(), width / 2 - 80, height / 2);
    }
  }
}
 
function keyPressed() {
  if (!synth) return;  
  let pitch = keyNotes[key];
  let polyPitch = keyNotesPoly[key];

  if (pitch && key !== activeKey) {
    synth.triggerRelease();
    activeKey = key;
    synth.triggerAttack(pitch);
  } else if (polyPitch) {
    polySynth.triggerAttack(polyPitch);
  } else if (key === "z") {
    ampEnv.triggerAttackRelease(0.1);
  }
}

// Stop monophonic synth when key is released
function keyReleased() {
  if (!synth) return;

  let polyPitch = keyNotesPoly[key];

  if (key === activeKey) {
    synth.triggerRelease();
    activeKey = null;
  } else if (polyPitch) {
    polySynth.triggerRelease(polyPitch);
  }
}
