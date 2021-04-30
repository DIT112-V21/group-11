const mqtt = require('mqtt');
const client  = mqtt.connect("mqtt://127.0.0.1");
const topic = "SimonDrives/time/";
let messagecount = 0;
let trialstatus = false;
let playerScore = 0;
let username = '';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Who are you? \n', name => {
    username = name;
    console.log('Time to drive ' + name + '!!!!');
    readline.close();
});
const { Pool, Client } = require("pg");

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "leaderboard",
    password: "", //add password to your local servers user!
    port: "5432"
});

module.exports.listener=function () {
    let distance = 0;
    client.on("connect", function () {
        console.log("connected2");
    });
    client.subscribe(topic, {qos: 1});

    client.on('message', function (topic, message) {
        try {
            messagecount++;
            console.log(messagecount);
            distance = message.toString();
            let timesUp = false;
            if (messagecount > 0 && !trialstatus) {
                timesUp = true;
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


    function publish(topic, msgStr) {
        if (client.connected === true) {
            playerScore = distance;
            console.log("DIN DISTANS BLEV: " + playerScore);
            console.log("publishing", msgStr);
            client.publish(topic, msgStr);
        }
    }

}