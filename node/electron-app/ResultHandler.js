//const { Pool, Client } = require("pg");
let leaderboardList = []
/*const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "leaderboard",
    password: "", //add password to your local servers user!
    port: "5432"
});*/


addToList(newRace("timetrial","test1", 1246))
addToList(newRace("timetrial","burrito", 1346))
addToList(newRace("timetrial","soda", 1273))
addToList(newRace("timetrial","summer", 1125))


/*
function newRace(modeType,username, distance) {
    if ((modeType && username && distance) !== undefined) {
        let race = {
            "gameMode": modeType,
            "name": username,
            "distance": distance
        }
        return race;
    }
}
/*
function addToList(content) {
    let size = leaderboardList.length;
    if (size === 0) {
        leaderboardList[0] = content;
    } else {
        leaderboardList[size++] = content;
    }
    return leaderboardList;
}
*/
function saveTimeTrialResult(name, distance, timeTrialMode){
    let race = newRace(timeTrialMode,name,distance);
    addToList(race);
    //pg save here
    //TODO save to different dB-table depending on @timeTrialMode
    /*switch (timeTrialMode) {
        case 15:
            break;
        case 45:
            break;
        case 90:
            break;
        default:
    }*/
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
let table = document.querySelector("table");
leaderboardList.sort(function (a, b){
    return b.distance - a.distance;
});
let data = Object.keys(leaderboardList[0]);


