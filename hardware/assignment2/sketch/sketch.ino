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

const int ledPin1 = 12, ledPin2 = 13, ledMatch = 11;  // LED pins
const int soundPin = A0;
int value = 0, randomNum = 0, ledBrightness = 0, userLED = 0;

void setup() {
  // starts the serial so I can run test messages
  Serial.begin(9600); 

  // intializes LEDs as outputs
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
}

void loop() {
  // generates a random number that will be within the range of the sound sensor
  randomNum = random(0, 1023);

  // explains how the game works
  game();

  // maps random number to be into LED range that user has to match
  ledBrightness = LEDmap(randomNum);
  analogWrite(ledMatch, ledBrightness);

  // player1's turn
  turn(randomNum, ledPin1);

  delay(5000);

  // player2's turn 
  turn(randomNum, ledPin2);
  
  Serial.println(value, DEC); // testing sensor value
  delay(200);
}

void game(){
  Serial.println("Welcome to the Sound Match game!");
  Serial.println("A random value will be generated that you must match to be caught by the sound sensor.");
  Serial.println("Whoever's light glowest the brightest is the closest to matching the value");
}

// maps number to be into LED range
int LEDmap(int value){
  return map(value, 0, 1023, 0, 255);
}

void turn(int match, int LED){
  // reading the value from the sound sensor
  value = analogRead(soundPin);
  Serial.println(value, DEC); // testing sensor value
  // maps collected user value to be into LED range that user captures
  userLED = LEDmap(value);
  analogWrite(LED, userLED);
}