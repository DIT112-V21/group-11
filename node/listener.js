const mqtt = require('mqtt');
const client  = mqtt.connect("mqtt://127.0.0.1");
const topic = "topic/distance";

module.exports.listener=function () {
    let distance=0;
    client.on("connect", function () {
        console.log("connected2");
    });
    client.subscribe(topic, {qos: 1});

    client.on('message', function (topic, message) {
        try {
            distance=message.toString();
            let timesUp= false;

            if(distance!=="0"){
                timesUp=true;
            };
            if (timesUp) {
                setTimeout(publish, 5 * 1000, "topic/input", "stop");
            }
            //console.log(`Distance from ${topic}: ` + message.toString());
            console.log("Distance:" + distance);
        } catch (e) {
            console.log(e)
        }

    });


    function publish(topic,msgStr) {
        if (client.connected === true) {
            console.log("publishing", msgStr);
            client.publish(topic,msgStr);
        }
    }

}