const button = document.getElementById('leadboard');
button.addEventListener('click', () => {
    createBrowserWindow();
});

function createBrowserWindow() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            devTools:true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    win.loadFile('leaderboard.html');
}