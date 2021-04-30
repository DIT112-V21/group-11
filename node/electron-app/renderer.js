const videoElement = document.querySelector('video');
const videoSelectBtn = document.getElementById('videoSelectBtn');
const applicationName = /SMCE-gd:(.*)/gmi;



const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;

async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window']
    });

    for (let source of inputSources) {
        if (applicationName.exec(source.name)) {
            return selectSource(source)
        }
    }
}
// Change the videoSource window to record
async function selectSource(source) {

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    // Create a Stream
    const stream = await navigator.mediaDevices
        .getUserMedia(constraints);

    // Preview the source in a video element
    videoElement.srcObject = stream;
    await videoElement.play();
}
openWindow = event => {
    const {BrowserWindow,screen} = require('electron').remote;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWindow = new BrowserWindow({
        width: width *0.7,
        height: height*0.9,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    newWindow.loadFile('screenWindow.html')
    newWindow.once("ready-to-show",()=>{
        newWindow.show()
    })
}