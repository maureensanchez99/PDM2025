let synth, reverb, punchImage;
let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
};

function preload() {
  // Load the punch image
  punchImage = loadImage('punch.png', 
    () => console.log("Image loaded successfully"), 
    () => console.error("Failed to load image. Check the file path.")
  );
}

function setup() {
  createCanvas(400, 400);

  // Create a polyphonic synth and connect it to a reverb effect
  synth = new Tone.PolySynth(Tone.Synth);
  reverb = new Tone.Reverb(0.5).toDestination();
  synth.connect(reverb);

  // Create a slider to control the reverb decay
  decaySlider = createSlider(0.1, 5, 1, 0.1);
  decaySlider.position(120, 350);
  decaySlider.input(() => {
    reverb.decay = decaySlider.value();
  });
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    // Display the punch image when the mouse is pressed
    imageMode(CENTER);
    image(punchImage, width / 2, height / 2, 200, 200);
  } else {
    // Display instructions when the mouse is not pressed
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Press A–K to play notes.\nAdjust reverb decay with the slider.", width / 2, height / 2);
  }

  // Display the current reverb decay value
  fill(0);
  textSize(12);
  textAlign(LEFT, CENTER);
  text(`Reverb Decay: ${reverb.decay.toFixed(2)}`, 10, 370);
}

function keyPressed() {
  // Play a note when a key is pressed
  let note = notes[key];
  if (note) {
    synth.triggerAttack(note);
  }
}

function keyReleased() {
  // Release the note when the key is released
  let note = notes[key];
  if (note) {
    synth.triggerRelease(note, '+0.03'); // Add a slight delay to reduce popping
  }
}