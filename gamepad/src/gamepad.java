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
        ControllerIndex currControler = controller.getControllerIndex(0);

        while(true) {

            controller.update();

            try {
                if(currControler.isButtonPressed(ControllerButton.A)) {
                    MqttMessage msgA = new MqttMessage("forward".getBytes());
                    msgA.setQos(0);
                    msgA.setRetained(true);
                    publisher.publish("SMCE-Group11",msgA);
                } else if (currControler.isButtonPressed(ControllerButton.X)) {
                    MqttMessage msgX = new MqttMessage("backward".getBytes());
                    msgX.setQos(0);
                    msgX.setRetained(true);
                    publisher.publish("SMCE-Group11",msgX);
                } else {
                    MqttMessage msgStop = new MqttMessage("stop".getBytes());
                    msgStop.setQos(0);
                    msgStop.setRetained(true);
                    publisher.publish("SMCE-Group11",msgStop);
                }

                if (currControler.getAxisState(ControllerAxis.LEFTX) < -0.5){
                    MqttMessage msgLeft = new MqttMessage("left".getBytes());
                    msgLeft.setQos(0);
                    msgLeft.setRetained(true);
                    publisher.publish("SMCE-Group11",msgLeft);

                } else if (currControler.getAxisState(ControllerAxis.LEFTX) > 0.5){
                    MqttMessage msgRight = new MqttMessage("right".getBytes());
                    msgRight.setQos(0);
                    msgRight.setRetained(true);
                    publisher.publish("SMCE-Group11",msgRight);

                } else if (currControler.getAxisState(ControllerAxis.LEFTX) < 0.5 && currControler.getAxisState(ControllerAxis.LEFTX) > -0.5) {
                    MqttMessage msgStraight = new MqttMessage("straight".getBytes());
                    msgStraight.setQos(0);
                    msgStraight.setRetained(true);
                    publisher.publish("SMCE-Group11", msgStraight);
                }

            } catch (ControllerUnpluggedException e){
                break;
            }
        }
    }

}

