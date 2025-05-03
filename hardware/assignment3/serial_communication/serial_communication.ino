/*

*/

int redPin = 5, greenPin = 6, bluePin = 9;
int lightPin = A0;
int value = 0;

void setup() {
  Serial.begin(9600);   

  // sets pins for LED values
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  // photoresistor pin
  pinMode(lightPin, INPUT);
}

void loop() {
  if (Serial.available() > 0) {
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
    }
  }

  // read and send photoresistor value
  value = analogRead(lightPin);
  Serial.println(value);
  delay(100); // Prevent flooding the serial port
}
