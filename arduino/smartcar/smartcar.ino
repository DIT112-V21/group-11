#include <Smartcar.h>

ArduinoRuntime arduinoRuntime;
BrushedMotor leftMotor(arduinoRuntime, smartcarlib::pins::v2::leftMotorPins);
BrushedMotor rightMotor(arduinoRuntime, smartcarlib::pins::v2::rightMotorPins);
DifferentialControl control(leftMotor, rightMotor);

const int TRIGGER_PIN = 6;
const int ECHO_PIN = 7;
const unsigned int MAX_DISTANCE = 300;
const int minimumDistance = 50;

SR04 front(arduinoRuntime, TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);
SimpleCar car(control);

void setup() {
  Serial.begin(9600);
    car.setSpeed(100);
}

void loop() {
  int currDist = front.getDistance();
  Serial.println(currDist);
  delay(10);

  if (currDist <= minimumDistance && currDist > 0)
  {
    car.setSpeed(0);
  }
  else if(currDist > minimumDistance) {
    car.setSpeed(5);
    Serial.println("Object Ahoy!");
  }
  else{
    Serial.println("No objects in sight!");
  }
  
}
