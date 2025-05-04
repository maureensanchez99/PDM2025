int buzzerPin = 8;
String incomingMessage = "";

void setup() {
  Serial.begin(9600);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '\n') {
      if (incomingMessage == "S") {
        tone(buzzerPin, 1000, 100);  // 1 kHz tone for 100ms
      }
      incomingMessage = ""; // Clear after processing
    } else {
      incomingMessage += c;
    }
  }
}
