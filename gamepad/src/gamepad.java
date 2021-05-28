import com.studiohartman.jamepad.*;
import org.eclipse.paho.client.mqttv3.*;
import java.util.concurrent.TimeUnit;

public class gamepad {




    public static void main(String[] args) throws MqttException, InterruptedException {

        String publisherId = "1";
        MqttMessage msgcheck = new MqttMessage();

        IMqttClient publisher = new MqttClient("tcp://localhost:1883",publisherId);
        MqttConnectOptions settings = new MqttConnectOptions();
        settings.setAutomaticReconnect(true);
        settings.setCleanSession(true);
        settings.setConnectionTimeout(10);
        publisher.connect(settings);
        ControllerManager controller = new ControllerManager();
        controller.initSDLGamepad();

        System.out.println(controller.getNumControllers() + " Controller(s) connected");
        ControllerIndex currController = controller.getControllerIndex(0);

        while(true) {
            TimeUnit.MILLISECONDS.sleep(50);


            controller.update();

            try {
                if(currController.isButtonPressed(ControllerButton.A)) {
                    MqttMessage msgA = new MqttMessage("forward".getBytes());
                    msgA.setQos(0);
                    msgA.setRetained(true);
                    if(!msgcheck.equals(msgA) ) {
                        publisher.publish("SimonDrives", msgA);
                        msgcheck = msgA;
                    }
                } else if (currController.isButtonPressed(ControllerButton.X)) {
                    MqttMessage msgX = new MqttMessage("backward".getBytes());
                    msgX.setQos(0);
                    msgX.setRetained(true);
                    if(!msgcheck.equals(msgX) ) {
                        publisher.publish("SimonDrives", msgX);
                        msgcheck = msgX;
                    }

                }
                else {
                    MqttMessage msgStop = new MqttMessage("stop".getBytes());
                    msgStop.setQos(0);
                    msgStop.setRetained(true);
                    if(!msgcheck.equals(msgStop) ) {
                        publisher.publish("SimonDrives", msgStop);
                        msgcheck = msgStop;
                    }

                }

                if (currController.getAxisState(ControllerAxis.LEFTX) < -0.5){
                    MqttMessage msgLeft = new MqttMessage("left".getBytes());
                    msgLeft.setQos(0);
                    msgLeft.setRetained(true);
                    if(!msgcheck.equals(msgLeft) ) {
                        publisher.publish("SimonDrives", msgLeft);
                        msgcheck = msgLeft;
                    }


                } else if (currController.getAxisState(ControllerAxis.LEFTX) > 0.5){
                    MqttMessage msgRight = new MqttMessage("right".getBytes());
                    msgRight.setQos(0);
                    msgRight.setRetained(true);
                    if(!msgcheck.equals(msgRight) ) {
                        publisher.publish("SimonDrives", msgRight);
                        msgcheck = msgRight;
                    }

                } else if (currController.getAxisState(ControllerAxis.LEFTX) < 0.5 && currController.getAxisState(ControllerAxis.LEFTX) > -0.5) {
                    MqttMessage msgStraight = new MqttMessage("straight".getBytes());
                    msgStraight.setQos(0);
                    msgStraight.setRetained(true);
                    if (!msgcheck.equals(msgStraight)) {
                        publisher.publish("SimonDrives", msgStraight);
                        msgcheck = msgStraight;
                    }
                }

            } catch (ControllerUnpluggedException e){
                break;
            }
        }
    }

}

