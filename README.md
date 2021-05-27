# SimonDrives

### What is SimonDrives?

SimonDrives is a software that allows the user to drive the car in the SMCE client using a controller. The application is compatible with both Xbox(360 and newer)- and Playstation(dualshock 2 or newer) controllers. SimonDrives allows you to compete versus yourself or friends through a multitude of game modes and custom designed maps. The best scores on each map and mode will be stored in their respective leaderboard to provide a fun and competitive enviroment. 

### Why will you make it?

As a result of the ongoing pandemic, isolation and boredom has become prevalent issues which we want to battle with this software. We believe that usage of our software will provide lots of fun moments and bring joy to all who chooses to try it. 

### How does it work?

In broad strokes, the application provides a UI which is created using the Electron framwork. The UI is written in html, css and node. The connection and mapping regarding the controller is done in java(Credits to https://github.com/williamahartman/Jamepad). The car-behavior is written using C++ in Arduino. The communication between Arduino and the other parts of the software is handled by MQTT. 

### Hardware requirements

In order to use this application to its full potential, the user needs to have one compatible controller alongside a functioning PC or Mac.

##### User manual

##### 1.0 Installation

Start off by pressing "Code" followed by "Download ZIP" and then specify the preferred directory. You will need a archive-software in order to extract the files. 

The following programs needs to be downloaded before you can start the actual set-up process. 

##### 1.1  SMCE 
Follow instructions provided here: https://github.com/ItJustWorksTM/smce-gd/wiki

##### 1.2  MQTT
Link to downloading MQTT can be found here: https://mosquitto.org/download/

##### 1.3  Java
The JDK can be installed here: https://www.oracle.com/java/technologies/javase-downloads.html

##### 1.4  Node, Electron
Installer for Node can be found here: https://nodejs.org/en/download/
When Node is installed, run the commandprompt as administrator(or terminal if you are using a MAC). In the command prompt, type "cd group-11".
Then type: "npm install electron --save-dev", this will install the electron framework.

##### 1.5 Extra tracks
In order to add the extra tracks, download the files found in the links below. Then place the ".zip" in ./Godot/app_userdata/SMCE/mods. When the SMCE client is started, choose the desired track in the drop down menu.

Racetrack "myWorld": https://drive.google.com/file/d/1lHe_47g0P4kTZjiYb3MuHVucRUDM6wJ2/view?usp=sharing (Created by: Johan Axell)

Survival Map: https://drive.google.com/file/d/177es0sBwbxdldIHiEGzbwY_RNfrJIuvE/view?usp=sharing (Created by: Robin Hansen)

Racetrack "PlankRace": https://drive.google.com/file/d/1eHmO1ZvyJ8qMFUZYMPBYEjsX4qQn7E58/view?usp=sharing (Created by: Christofer Jidarv)

##### 2.0 Set up 
When the installation of the softwares listed above is complete, in order to play the actual game you will have follow the steps below. 

##### 2.1 Java 
Either you can compile the Java-code in your commandprompt, using "javac gamepad.java" to compile and then "java gamepad.java" to run, or use an IDE of your choice. You should receive a confirmation saying "Controller connected" if a compatible controller is plugged in. 

##### 2.2 MQTT
In the command prompt, navigate to the Mosquitto root folder(using the "cd"-command as shown above), such as C:\Program Files (x86)\mosquitto and then start by running the command "net start mosquitto".

##### 2.3 SMCE
Start the client by opening the SMCE executable followed by "Start Fresh". On the next page, click the "+" and then go to "/group-11/arduino/smartcar/ardunio.ino. You can also click "=" to choose the desired map in the drop down menu. More about this in section 3.

##### 2.4 Node, Electron
In the commandprompt, find your way to /group-11/node/, in order to start the user interface, type "npm start". 

##### 3.0 How to use

##### 3.1 Leaderboard
You find the leaderboard-option on the first screen when you run "npm start". The leaderboard sports 4 different sections, depending on what mode and map you choose to play. As of right now, the top 5 scores will be saved for each mode and map. 

##### 3.2 Different game modes // how to change game modes 
On the first screen, choose "Start". You can then choose what mode you want to play, do note that as of now, the modes are only compatible with certain maps. More information on that can be found below.

##### 3.2.1 Race Mode
When you choose Race Mode, you will be forwarded to a new screen containing the two different compatible maps. Do note that before you click on the map you want to play, you have to choose the corresponding one in the SMCE client before you click it. For race mode, you can choose to play "myWorld" or "PlankRace". When the map is chosen, click the "=" button followed by "Compile". When you have chosen what map you want to play, a screen counting down will show followed by the actual gamescreen. 

##### 3.2.2 Survival and Timetrial mode
As opposed to the Race Mode, when you choose the mode you will be starting the game right away, no map selection will be available. Do note that the map still needs to be chosen before you choose the game mode. For the survival mode, choose the map fittingly named "Survival mode" and for Time trial, choose "Playground". 

In order to get the full functionality that survival mode provides, the user need to change sketch to the file found in "/group-11/arduino/survivalCar/survivalCar.ino". Skipping this step prevents the user from getting a better experience.

##### 3.3 Controller
![image](https://user-images.githubusercontent.com/71591829/119828154-31b55180-befa-11eb-9b59-3d571dcbf327.png)
![image](https://user-images.githubusercontent.com/71591829/119825347-23196b00-bef7-11eb-9d2c-513f3cf600d2.png)

##### 4.0 Limitations and future development
As of now, there are no suitible ways to connect the UI to the actual SMCE client. This results in the user having to manage settings both in the SMCE client and the UI. This also means that in theory, maps that arent created for a specific gamemode can still be played which may skew the leaderboard-results. 

Future plans include hosting the leaderboard online in order to compete versus players all around the globe, adding more tracks and the option to modify the appearence of the car. We also hope to add multiplayer at some point, so you are able to compete in real time versus other players, as well as competing vs AI-controlled cars. 

##### 5.0 Developer information
Information regarding creating and modifying current maps and car can be found here: https://github.com/ItJustWorksTM/smce-gd/wiki/Modding

##### 6.0 Credits
SMCE - https://github.com/ItJustWorksTM/smce-gd/








