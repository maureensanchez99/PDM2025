/*
Programming Hardware: Assignment 4
3.4 Controller
*/

const int joyStick_X = A0;
const int joyStick_Y = A1;
const int joyStick_SW = 2;

const int num_Readings = 10;


struct readings {
    int x_Value = analogRead(joyStick_X);
    int y_Value = analogRead(joyStick_Y);

    int value = digitalRead(joyStick_SW); 
}

void setup() {
    Serial.begin(9600); //starts the baud rate at 9600
    pinMode(joyStick_X, INPUT);
    pinMode(joyStick_Y, INPUT);
    pinMode(joyStick_SW, INPUT);
}

void loop() {
    while (Serial.available() > 0){

        int x_Value = analogRead(joyStick_X);
        int y_Value = analogRead(joyStick_Y);

        int value = digitalRead(joyStick_SW);
    }
}