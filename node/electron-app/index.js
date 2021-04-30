const { app, BrowserWindow } = require('electron')
const path = require('path')
const electron = require("electron");
const remote = electron.remote;

function createWindow () {
    const win = new BrowserWindow({
        width: 600,
        height: 300,
        frame:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }

})