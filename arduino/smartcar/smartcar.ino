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

const int frontPin = 0;
const int leftPin = 1;
const int rightPin = 2;
const int backPin = 3;

int latestDistance = 0;
const auto oneSecond = 1000UL;
const auto triggerPin = 6;
const auto echoPin = 7;
const auto maxDistance = 400;
const auto minimumDistance = 50;
SR04 front(arduinoRuntime, triggerPin, echoPin, maxDistance);
GP2Y0A21 forwardIR(arduinoRuntime, frontPin);
GP2Y0A21 leftIR(arduinoRuntime, leftPin);
GP2Y0A21 rightIR(arduinoRuntime, rightPin);
GP2Y0A21 backwardIR(arduinoRuntime, backPin);

auto finishMessage = "";
auto raceCarFinishedBoolean = false;
auto speedCarFinishedBoolean = false;

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
      } else if (message == "speedModeSetSpeed"){
          car.setSpeed(50);
      } else if (message == "resetRace"){
          raceCarFinishedBoolean = false;
          speedCarFinishedBoolean = false;
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

  

  if(leftIR.getDistance() < 0.3 && leftIR.getDistance() > 0 && rightIR.getDistance() < 0.3 && rightIR.getDistance() > 0 && raceCarFinishedBoolean == false){
    finishMessage = "RaceCarFinish";
    mqtt.publish("SimonDrives/race/", finishMessage);
    raceCarFinishedBoolean = true;
    }

  if((forwardIR.getDistance() > 0.1 || leftIR.getDistance() > 0.1  || rightIR.getDistance() > 0.1) && speedCarFinishedBoolean == false){
    finishMessage = "SpeedCarFinish";
    mqtt.publish("SimonDrives/speed/", finishMessage);
    speedCarFinishedBoolean = true;
    }



  


  
}
