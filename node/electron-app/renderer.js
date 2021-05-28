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
openVideoWindow = event => {
    const {BrowserWindow,screen} = require('electron').remote;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    newWindow.loadFile('TimeTrial.html')
    const video = newWindow.open('TimeTrial.html')
    newWindow.once("ready-to-show",()=>{
        newWindow.show()
        video.load(getVideoSources())
    })
}

function openWindow(page){
    const {BrowserWindow,screen} = require('electron').remote;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    newWindow.loadFile(page)
}

function openMediumWindow(page){
    const {BrowserWindow,screen} = require('electron').remote;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    newWindow.loadFile(page)
}

function openSmallerWindow(page){
    const {BrowserWindow,screen} = require('electron').remote;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWindow = new BrowserWindow({
        width: 750,
        height: 420,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    newWindow.loadFile(page)
}
async function loadPage (page) {
    try {
        await remote.getCurrentWindow().loadFile(page)
    } catch (e) {
        console.log(`Invalid HTML file path loaded. ` + e)
    }
}
