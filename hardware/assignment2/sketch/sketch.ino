/*
Assignment 2 of Hardware Section  
PWM Game  

Create a two-person game using at least one analog input (Photoresistor, pressure sensor, flex sensor, etc. typically in a resistor-divider network) and at least one pulse-width-modulated (Analog) output (buzzer, LED, etc).     

For instance, you could create a circuit that has a user press a pressure sensor causing an LED to become steadily righter and then stays at it's brightest point. Then the next person tries to make another light go brighter. Perhaps if they go too far, it reverses direction and dims.  

You must include at least one sentence describing each of the following components in the comments: game objective, rules, challenge, and interaction.  
*/

#include <Arduino.h>

const int ledPin1 = 12, ledPin2 = 13;  // LED pins
const int soundPin = A0;
int value = 0;

void setup() {
  // starts the serial so I can run test messages
  Serial.begin(9600); 

  // intializes LEDs as outputs
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
}

void loop() {
  value = analogRead(soundPin);
  
  Serial.println(value, DEC);
  delay(200);
}