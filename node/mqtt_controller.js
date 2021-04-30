const mqtt = require('mqtt');
const listener = require('./listener.js');
const client  = mqtt.connect("mqtt://127.0.0.1");
client.on("connect",function(){
    console.log("connected");
})
listener.listener();
const topic = "SimonDrives";
let message = 0;
let msgStr = "";
//setInterval(function (){ message++; msgStr = message.toString();}, 1000);


//publish every 1 sec
/*
setInterval(function(){
    publish(topic,msgStr);
},1000);
*/

//publish function
function publish(topic,msgStr) {
    console.log("publishing", msgStr);
    if (client.connected === true) {
        switch (message) {
            case 25:
                client.publish(topic, "forward")
                break;
            case 35:
                client.publish(topic, "backward")
                break;
            default:
                client.publish(topic, msgStr);
        }
    }
}