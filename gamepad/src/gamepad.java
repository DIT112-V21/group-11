import com.studiohartman.jamepad.ControllerManager;
import com.studiohartman.jamepad.ControllerState;
import org.eclipse.paho.client.mqttv3.*;

import java.util.UUID;

public class gamepad {




    public static void main(String[] args) throws MqttException {

        String publisherId = UUID.randomUUID().toString();
        IMqttClient publisher = new MqttClient("tcp://localhost:1883",publisherId);
        MqttConnectOptions settings = new MqttConnectOptions();
        settings.setAutomaticReconnect(true);
        settings.setCleanSession(true);
        settings.setConnectionTimeout(10);
        publisher.connect(settings);

        ControllerManager controller = new ControllerManager();
        controller.initSDLGamepad();


        while(true) {
            ControllerState currState = controller.getState(0);

            if(!currState.isConnected || currState.b) {
                break;
            }
            if(currState.a) {
                MqttMessage msgA = new MqttMessage("forward".getBytes());
                msgA.setQos(0);
                msgA.setRetained(true);
                publisher.publish("topic",msgA);
            }
            if(currState.x) {
                MqttMessage msgX = new MqttMessage("backward".getBytes());
                msgX.setQos(0);
                msgX.setRetained(true);
                publisher.publish("topic",msgX);
            }

            if(currState.leftStickX < -0.5){
                MqttMessage msgLeft = new MqttMessage("left".getBytes());
                msgLeft.setQos(0);
                msgLeft.setRetained(true);
                publisher.publish("topic",msgLeft);
            }

            if(currState.leftStickX > 0.5){
                MqttMessage msgRight = new MqttMessage("right".getBytes());
                msgRight.setQos(0);
                msgRight.setRetained(true);
                publisher.publish("topic",msgRight);
            }
        }

    }

}

