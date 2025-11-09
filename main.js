const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    height: 700,
    width: 1100,
    resizable: false, // ❌ no se puede cambiar el tamaño
    maximizable: false, // ❌ no se puede maximizar
    minimizable: true, // ✅ aún se puede minimizar
    autoHideMenuBar: true, // 🔹 oculta el menú superior
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenu(null)
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
