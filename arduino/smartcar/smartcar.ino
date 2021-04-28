#include <MQTT.h>
#ifdef __SMCE__
#include <OV767X.h>
#endif

#include <Smartcar.h>

MQTTClient mqtt;

ArduinoRuntime arduinoRuntime;
BrushedMotor leftMotor(arduinoRuntime, smartcarlib::pins::v2::leftMotorPins);
BrushedMotor rightMotor(arduinoRuntime, smartcarlib::pins::v2::rightMotorPins);
DifferentialControl control(leftMotor, rightMotor);

SimpleCar car(control);

int latestDistance = 0; 
const auto oneSecond = 1000UL;
const auto triggerPin = 6;
const auto echoPin = 7;
const auto maxDistance = 400;
const auto minimumDistance = 50;
SR04 front(arduinoRuntime, triggerPin, echoPin, maxDistance);

const auto pulsesPerMeter = 600;

DirectionlessOdometer leftOdometer{
    arduinoRuntime,
    smartcarlib::pins::v2::leftOdometerPin,
    []() { leftOdometer.update(); },
    pulsesPerMeter};
DirectionlessOdometer rightOdometer{
    arduinoRuntime,
    smartcarlib::pins::v2::rightOdometerPin,
    []() { rightOdometer.update(); },
    pulsesPerMeter};

DistanceCar car2(arduinoRuntime, control, leftOdometer, rightOdometer);
int speed = 100;
int hardTurn = 30;

auto message_func = [](String SimonDrives, String message){
      if (message == "forward") {
        car.setSpeed(100);
      } else if (message == "backward") {
          car.setSpeed(-100);
      } else if (message == "right") {
          car.setAngle(50);
      } else if (message == "left") {
          car.setAngle(-50);
      } else if (message == "straight") {
          car.setAngle(0);
      } else if (message == "stop") {
          car.setSpeed(0);
      } else {
        Serial.println(message);
      }
};


    

void setup() {
  Serial.begin(9600);
  car2.enableCruiseControl();

  if(mqtt.connect("username", "username", "password" ))
  {
    mqtt.subscribe("SimonDrives/#", 1);
    mqtt.onMessage(message_func);
  }
}

void loop() {
  
  //car2.update();
  if (mqtt.connected()) 
  {
      mqtt.loop(); 
     
  }
  
  if(car2.getSpeed()!= 0){
     const auto distanceCheck = car2.getDistance();
     const auto travelledDistance = String(distanceCheck);
     if (distanceCheck != latestDistance) { 
     mqtt.publish("SimonDrives/time/", travelledDistance);
     latestDistance = distanceCheck; 
     }
  }
}
