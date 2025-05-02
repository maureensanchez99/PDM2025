/*
Assignment 1 of Hardware Section  
You work for the haunted house company 17th Turnstile. In a new scary sci-fi exhibit they want you to detect a person's presence and trigger electrical items to flicker on and off sporadically. Do this with physical computing...  

You will need:   
- two digital inputs (i.e., two buttons)  
- two LEDs (or a buzzer or something else you can turn on/off)  
- code to make it blink in different patterns depending on which button is pressed  

For a challenge, have it say something in morse code.  
*/

#include <Arduino.h>

const int buttonPin1 = 2, buttonPin2 = 3;  // pushbutton pins
int buttonPin1State, buttonPin2State;  // pushbutton pins state
const int ledPin1 = 12, ledPin2 = 13;  // LED pins


void setup() {
    Serial.begin(9600);
    // initalizes buttons to be inputs
    pinMode(buttonPin1, INPUT);
    pinMode(buttonPin2, INPUT);

    // initializes LEDs as outputs
    pinMode(ledPin1, OUTPUT);
    pinMode(ledPin2, OUTPUT);
}

void loop() {
    buttonPin1State = digitalRead(buttonPin1);
    buttonPin2State = digitalRead(buttonPin2);

    if (buttonPin1State == HIGH){
        Serial.println("Boo");
        boo();
    } else if (buttonPin2State == HIGH){
        Serial.println("Get Out");
        getOut();
    }
}

void dot(int ledPin) {
  digitalWrite(ledPin, HIGH);
  delay(200);
  digitalWrite(ledPin, LOW);
  delay(200);
}

void dash(int ledPin) {
  digitalWrite(ledPin, HIGH);
  delay(600);
  digitalWrite(ledPin, LOW);
  delay(200);
}

void letterSpace() {
  delay(600);
}

void wordSpace() {
  delay(1400);
}

// reads button1 and plays "Boo" in morse code with light
void boo(){
  // B: - . . .
  dash(ledPin1);
  dot(ledPin1);
  dot(ledPin1);
  dot(ledPin1);
  letterSpace();

  // O: - - -
  dash(ledPin2);
  dash(ledPin2);
  dash(ledPin2);
  letterSpace();

  // O: - - -
  dash(ledPin1);
  dash(ledPin1);
  dash(ledPin1);
  letterSpace();
}

// reads button2 and plays "Get Out" in morse code with light
void getOut(){
      // G: --.
  dash(ledPin1);
  dash(ledPin1);
  dot(ledPin1);
  letterSpace();

  // E: .
  dot(ledPin2);
  letterSpace();

  // T: -
  dash(ledPin1);
  wordSpace();

  // O: ---
  dash(ledPin2);
  dash(ledPin2);
  dash(ledPin2);
  letterSpace();

  // U: ..-
  dot(ledPin1);
  dot(ledPin1);
  dash(ledPin1);
  letterSpace();

  // T: -
  dash(ledPin2);
  wordSpace();
}