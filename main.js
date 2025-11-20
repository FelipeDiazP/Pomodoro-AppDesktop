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

  win.loadFile("index.html");

<<<<<<< HEAD
  mainWindow.webContents.setAudioMuted(false);

=======
  // 🔊 Control inicial del volumen
  mainWindow.webContents.setAudioMuted(false);

  // 🔉 Bajar volumen al 30%
>>>>>>> 88df1bc6458ffffc0330c800637bec22174ad415
  mainWindow.webContents.setVolume(0.1);
};

app.whenReady().then(() => {
  createWindow();
});
