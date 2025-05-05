const int buzzerPin = 8;
const int LEDpin = 9;
int brightness = 255;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(LEDpin, OUTPUT);

}

void loop() {
  playThunder();
  delay(2000); // Wait between thunder strikes
}

void playThunder() {
  // Simulate the sudden thunder crack
  for (int i = 200; i >= 100; i -= 5) {
    tone(buzzerPin, i);
    delay(random(30, 60));
    analogWrite(LEDpin, brightness);
  }

  // Simulate rumbling fade
  for (int i = 0; i < 15; i++) {
    tone(buzzerPin, random(60, 120));
    delay(random(50, 100));
    noTone(buzzerPin);
    delay(random(20, 80));
    brightness = brightness - 15;
    analogWrite(LEDpin, brightness);
  }

  noTone(buzzerPin);
}