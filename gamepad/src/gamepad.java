import com.studiohartman.jamepad.*;
import org.eclipse.paho.client.mqttv3.*;
import java.util.UUID;

public class gamepad {




    public static void main(String[] args) throws MqttException {

        String publisherId = "1";

        IMqttClient publisher = new MqttClient("tcp://localhost:1883",publisherId);
        MqttConnectOptions settings = new MqttConnectOptions();
        settings.setAutomaticReconnect(true);
        settings.setCleanSession(true);
        settings.setConnectionTimeout(10);
        publisher.connect(settings);

        ControllerManager controller = new ControllerManager();
        controller.initSDLGamepad();

        System.out.println(controller.getNumControllers());
        ControllerIndex currController = controller.getControllerIndex(0);

        while(true) {

            controller.update();

            try {
                if(currController.isButtonPressed(ControllerButton.A)) {
                    MqttMessage msgA = new MqttMessage("forward".getBytes());
                    msgA.setQos(0);
                    msgA.setRetained(true);
                    publisher.publish("SimonDrives", msgA);
                } else if (currController.isButtonPressed(ControllerButton.X)) {
                    MqttMessage msgX = new MqttMessage("backward".getBytes());
                    msgX.setQos(0);
                    msgX.setRetained(true);
                    publisher.publish("SimonDrives", msgX);
                }
                else {
                    MqttMessage msgStop = new MqttMessage("stop".getBytes());
                    msgStop.setQos(0);
                    msgStop.setRetained(true);
                    publisher.publish("SimonDrives", msgStop);
                }

                if (currController.getAxisState(ControllerAxis.LEFTX) < -0.5){
                    MqttMessage msgLeft = new MqttMessage("left".getBytes());
                    msgLeft.setQos(0);
                    msgLeft.setRetained(true);
                    publisher.publish("SimonDrives", msgLeft);

                } else if (currController.getAxisState(ControllerAxis.LEFTX) > 0.5){
                    MqttMessage msgRight = new MqttMessage("right".getBytes());
                    msgRight.setQos(0);
                    msgRight.setRetained(true);
                    publisher.publish("SimonDrives", msgRight);

                } else if (currController.getAxisState(ControllerAxis.LEFTX) < 0.5 && currController.getAxisState(ControllerAxis.LEFTX) > -0.5) {
                    MqttMessage msgStraight = new MqttMessage("straight".getBytes());
                    msgStraight.setQos(0);
                    msgStraight.setRetained(true);
                    publisher.publish("SimonDrives", msgStraight);
                }

            } catch (ControllerUnpluggedException e){
                break;
            }
        }
    }

}

