const mqtt = require('mqtt');
const ArrayList = require("arraylist");
const client  = mqtt.connect("mqtt://127.0.0.1");
const topic = "SimonDrives/time/";
let messagecount = 0;
let trialstatus = false;
let result = 0;
const highscorelist = new ArrayList;
let standing = 1;

module.exports.listener=function () {
    let distance=0;
    client.on("connect", function () {
        console.log("connected2");
    });
    client.subscribe(topic, {qos: 1});

    client.on('message', function (topic, message) {
        try {
            messagecount++;
            console.log(messagecount);
            distance=message.toString();
            let timesUp= false;
            if(messagecount > 0 && !trialstatus){
                timesUp=true;
            }
            if (timesUp) {
                setTimeout(publish, 5 * 1000, "SimonDrives/time/", "stop");
                trialstatus = true;
            }
            //console.log(`Distance from ${topic}: ` + message.toString());
            console.log("Distance:" + distance);
        } catch (e) {
            console.log(e)
        }

    });


    function publish(topic,msgStr) {
        if (client.connected === true) {
            result = distance;
            console.log("DIN DISTANS BLEV: " + result);
            leaderboard();
            console.log("publishing", msgStr);
            client.publish(topic,msgStr);
        }
    }

    function leaderboard() {
        console.log("***----  LEADERBOARD  ----***");
        highscorelist.add(result);
        console.log(standing + ". " + highscorelist.toString());
        standing++;
    }
}