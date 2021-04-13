const mqtt = require('mqtt');
const client  = mqtt.connect("mqtt://127.0.0.1",{clientId:"DIT112-G11"});
const topic = "SMCE-Group11";
client.on("connect",function(){
    console.log("connected2");
});
client.subscribe(topic,{qos:1});

client.on('message',function(topic, message){
    try {
        console.log(`MQTT Notification from ${topic}: `  + message);
    } catch (e) {
        console.log(e)
    }
});
