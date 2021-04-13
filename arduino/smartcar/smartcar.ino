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


const auto oneSecond = 1000UL;
const auto triggerPin = 6;
const auto echoPin = 7;
const auto maxDistance = 400;
const auto minimumDistance = 50;
SR04 front(arduinoRuntime, triggerPin, echoPin, maxDistance);


int speed = 100;


auto message_func = [](String topic, String message){
      if (message == "forward") {
        car.setSpeed(speed);
      } else if (message == "backward") {
        car.setSpeed(speed*-1);
      } else {
        Serial.println(topic + " " + message);
      }
};

void setup() {
  Serial.begin(9600);
  

  if(mqtt.connect("username", "username", "password" ))
  {
    mqtt.subscribe("SMCE-Group11", 1);
    mqtt.onMessage(message_func);
  }
}

void loop() {
if (mqtt.connected()) 
  {
      mqtt.loop();
  }
  int currDist = front.getDistance();
  Serial.println("Front dist: " + currDist);
  delay(10);

  if (currDist <= minimumDistance && currDist > 0)
  {
    car.setSpeed(0);
  }
  else if(currDist > minimumDistance) {
    car.setSpeed(5);
    Serial.println("Object Ahoy!");
  }
}
