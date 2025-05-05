const int ledPin = 9;
const int buttonPin = 2;
const int buzzerPin = 8;

int buttonState;

void setup (){
  Serial.begin(9600);

  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop (){
  buttonState = digitalRead(buttonPin);

  playThunder();

  digitalWrite(ledPin, HIGH);
}

void playThunder() {
  long duration = random(500, 1500); // Duration of thunder
  long startTime = millis();

  while (millis() - startTime < duration) {
    int freq = random(60, 200); // Low rumbling frequency range
    int dur = random(20, 100);  // Short burst

    tone(buzzerPin, freq, dur);
    delay(dur + random(10, 50));
  }

  noTone(buzzerPin);
}