const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    height: 700,
    width: 1100,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      resizable: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenu(null)
  win.loadFile("index.html");

  // 🔊 Control inicial del volumen
  mainWindow.webContents.setAudioMuted(false);

  // 🔉 Bajar volumen al 30%
  mainWindow.webContents.setVolume(0.1);
};

app.whenReady().then(() => {
  createWindow();
});
