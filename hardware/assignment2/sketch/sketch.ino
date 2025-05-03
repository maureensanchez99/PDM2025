/*
Assignment 2 of Hardware Section  
PWM Game  

Create a two-person game using at least one analog input (Photoresistor, pressure sensor, flex sensor, etc. 
typically in a resistor-divider network) and at least one pulse-width-modulated (Analog) output (buzzer, LED, etc).     

For instance, you could create a circuit that has a user press a pressure sensor causing an LED to become steadily 
righter and then stays at it's brightest point. Then the next person tries to make another light go brighter. Perhaps 
if they go too far, it reverses direction and dims.  

You must include at least one sentence describing each of the following components in the comments: game objective, 
rules, challenge, and interaction.  
*/

#include <Arduino.h>

const int buttonPin = 2;  // pushbutton pins
const int ledPin1 = 9, ledPin2 = 10;  // LED pins
const int lightPin = A0;
int value = 0, ledBrightness = 0, userLED = 0;
bool playerOneTurn = true;
bool buttonPreviouslyPressed = false;

void setup() {
  // starts the serial so I can run test messages
  Serial.begin(9600); 

  // initalizes button to be inputs
  pinMode(buttonPin, INPUT);

  // intializes LEDs as outputs
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);

  // explains how the game works
  game();
}

void loop() {
  buttonPinState = digitalRead(buttonPin);
  value = analogRead(lightPin);
  Serial.print("Current light value: ");
  Serial.println(value);

  while(buttonPinState == LOW) {
    // player1's turn
    Serial.println("Player 1's Turn");
    turn(ledPin1);
    buttonPinState = digitalRead(buttonPin);
    delay(2000);
  }
  // player2's turn
  Serial.println("Player 2's Turn");
  turn(ledPin2);

  Serial.println(); // testing sensor value
  delay(5000);
}

void game(){
  Serial.println("Welcome to the Brightest Light game!");
  Serial.println("Whoever can make their light glow the brightest is the winner.");
}

// changes value from photoresistor to be of that range to be of range for LED lights
int mapLED(int userValue) {
  return map(userValue, 0, 1015, 0, 255);
}

void turn(int LED){
  // reading the value from the light sensor
  value = analogRead(lightPin);

  Serial.println(value, DEC); // testing sensor value
  userLED = mapLED(value);
  // write collected user value to be into LED range that user captures
  analogWrite(LED, userLED);
}