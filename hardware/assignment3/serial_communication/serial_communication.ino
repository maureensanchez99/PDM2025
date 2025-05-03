/*

*/

int redPin = 5, int greenPin = 6, int bluePin = 9;
int lightPin = A0;

void setup() {
  Serial.begin(9600);   

  // sets pins for LED values
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  while (Serial.available() > 0) {
    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
    } else {
      while (Serial.available() > 0) Serial.read(); // flush bad data
    }
  }
}
