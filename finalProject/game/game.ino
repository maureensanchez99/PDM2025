const int buzzerPin = 8;
const int LEDpin = 9;
const int buttonPin = 2;
const int lightSensor = A0;

int buttonState = 0;
int brightness = 255;
int value = 0;

int thunderNoise;
int isThunder = false;
unsigned long lastUpdate = 0;
int thunderStep = 0;
bool inRumble = false;

void setup() {
  Serial.begin(9600);

  pinMode(buzzerPin, OUTPUT);
  pinMode(LEDpin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(lightSensor, INPUT);
}

void loop() {
  // Check for serial input to toggle thunder
  if (Serial.available() > 0) {
    thunderNoise = Serial.parseInt();
    isThunder = thunderNoise == 1;

    // if thunder turned off, reset
    if (!isThunder) {
      noTone(buzzerPin);
      analogWrite(LEDpin, 0);
      thunderStep = 0;
      inRumble = false;
    }
  }

  // Read sensors
  buttonState = digitalRead(buttonPin);
  value = analogRead(lightSensor);

  // Send both values as CSV
  Serial.print(value);
  Serial.print(",");
  Serial.println(buttonState);

  delay(100);

  // If thunder is enabled, play it incrementally
  if (isThunder) {
    playThunder();
  }
}

void playThunder() {
  unsigned long now = millis();

  // Reset brightness at the start of a new thunder sequence
  if (!inRumble && thunderStep == 0) {
    brightness = 255;
  }

  // Thunder crack (pitch descending)
  if (!inRumble && now - lastUpdate > 50) {
    int pitch = 200 - thunderStep * 5;
    if (pitch >= 100) {
      tone(buzzerPin, 100, pitch);
      analogWrite(LEDpin, brightness);
      brightness = max(0, brightness - 10);
      lastUpdate = now;
      thunderStep++;
    } else {
      thunderStep = 0;
      inRumble = true;
    }
  }

  // Rumble stage (randomized tone)
  else if (inRumble && now - lastUpdate > 80) {
    if (thunderStep < 15) {
      int pitch = random(60, 120);
      tone(buzzerPin, pitch);
      analogWrite(LEDpin, brightness);
      delay(40);  // short controlled delay for tone effect
      noTone(buzzerPin);
      brightness = max(0, brightness - 10);
      lastUpdate = now;
      thunderStep++;
    } else {
      noTone(buzzerPin);
      analogWrite(LEDpin, 0);
      thunderStep = 0;
      inRumble = false;
    }
  }
}