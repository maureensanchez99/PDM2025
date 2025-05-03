#include <Arduino.h>

// Pin Setup
const int buttonPin = 2;  // pushbutton pin
const int ledPin1 = 9, ledPin2 = 10;  // LED pins
const int lightPin = A0;  // Photoresistor pin

// Variables
bool playerTurn = true;  // true = Player 1, false = Player 2
bool buttonPreviouslyPressed = false;

void setup() {
  Serial.begin(9600); 

  pinMode(buttonPin, INPUT_PULLUP); // using internal pull-up resistor
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);

  game();
  Serial.println("Press the button to start Player 1's turn.");
}

void loop() {
  bool buttonPressed = digitalRead(buttonPin) == LOW;

  // Detect rising edge (button just pressed)
  if (buttonPressed && !buttonPreviouslyPressed) {
    // Indicate whose turn it is
    Serial.println(playerTurn ? "Player 1's Turn" : "Player 2's Turn");

    // Run the turn for the active player
    turn(playerTurn ? ledPin1 : ledPin2);

    //delay(5000);

    // Switch turn
    playerTurn = !playerTurn;

    Serial.println("Press the button for the next player's turn.");
  }

  // Update the previous button state
  buttonPreviouslyPressed = buttonPressed;
}

void game(){
  Serial.println("Welcome to the Brightest Light game!");
  Serial.println("Whoever can make their light glow the brightest is the winner.");
  Serial.println("Players take turns pressing the button and using the light sensor to set their LED brightness.");
}

// Map the sensor value to LED brightness range
int mapLED(int userValue) {
  return map(userValue, 0, 1015, 0, 255);
}

void turn(int LED){
  // Read from the light sensor once
  int value = analogRead(lightPin);
  int userLED = mapLED(value);

  Serial.println("Sensor Value: ");
  Serial.print(value);
  Serial.println();
  // Set LED brightness
  analogWrite(LED, userLED);
}