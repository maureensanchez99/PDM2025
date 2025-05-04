int buzzerPin = 8;          // Pin connected to the buzzer
int joystickXPin = A0;      // Joystick X-axis pin
int joystickYPin = A1;      // Joystick Y-axis pin
int buttonPin = 2;          // Pushbutton pin
String incomingMessage = ""; // Buffer to store incoming serial messages

void setup() {
  Serial.begin(9600);       // Initialize serial communication at 9600 baud
  pinMode(buzzerPin, OUTPUT); // Set the buzzer pin as an output
  pinMode(buttonPin, INPUT_PULLUP); // Set the button pin as an input with a pull-up resistor
}

void loop() {
  // Read joystick values
  int joystickX = analogRead(joystickXPin);
  int joystickY = analogRead(joystickYPin);

  // Read button state
  int buttonState = digitalRead(buttonPin);

  // Send joystick and button data to the computer
  Serial.print(joystickX);
  Serial.print(",");
  Serial.print(joystickY);
  Serial.print(",");
  Serial.println(buttonState);

  // Check if there is data available on the serial port
  while (Serial.available() > 0) {
    char c = Serial.read(); // Read one character from the serial buffer

    // Check for the end of the message
    if (c == '\n') {
      // If the message is "S", trigger the buzzer
      if (incomingMessage == "S") {
        tone(buzzerPin, 1000, 100);  // Play a 1 kHz tone for 100 ms
      }
      incomingMessage = ""; // Clear the message buffer after processing
    } else {
      incomingMessage += c; // Append the character to the message buffer
    }
  }

  delay(50); // Small delay to avoid flooding the serial port
}
