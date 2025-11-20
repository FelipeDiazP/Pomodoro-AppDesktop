const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    height: 700,
    width: 1100,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  mainWindow.webContents.setAudioMuted(false);

  mainWindow.webContents.setVolume(0.1);
};

app.whenReady().then(() => {
  createWindow();
});
