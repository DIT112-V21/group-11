const mqtt = require('mqtt');
const client  = mqtt.connect("mqtt://127.0.0.1");
client.on("connect",function(){
    console.log("connected");
})
const topic = "SMCE-Group11";
let message = 0;
let msgStr = "";
setInterval(function (){ message++; msgStr = message.toString();}, 1000);


//publish every 1 sec
setInterval(function(){
    publish(topic,msgStr);
},1000);

//publish function
function publish(topic,msgStr) {
    console.log("publishing", msgStr);
    if (client.connected === true) {
        switch (message) {
            case 30 || 38:
                client.publish(topic, "forward")
                break;
            case 33:
                client.publish(topic, "backward")
                break;
            default:
            client.publish(topic, msgStr);
        }
    }
}