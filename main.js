const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const printer = require('pdf-to-printer');
const scanner = require('scanner'); 
const configPath = path.join(app.getPath('documents'), '.scanner.yaml');
let mainWindow;

const defaultConfig = `
scanner:
  default: "good" 
`;

app.on('ready', () => {

  if (!fs.existsSync(configPath)) {
    // ถ้าไม่มีให้สร้างไฟล์ใหม่
    fs.writeFileSync(configPath, defaultConfig.trim(), { encoding: 'utf8' });
    console.log('.scanner.yaml ถูกสร้างขึ้นที่:', configPath);
  } else {
    console.log('.scanner.yaml มีอยู่แล้วที่:', configPath);
  }
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  

  mainWindow.loadURL('http://localhost:4200');
});

ipcMain.on('scan-document', (event) => {
  scanner.scan((error, result) => {
    if (error) {
      console.error('การสแกนล้มเหลว:', error);
      event.reply('scan-error', 'การสแกนล้มเหลว');
    }
    event.reply('scan-result', result);
  });
});

ipcMain.on('print-pdf', (event, filePath) => {
    printer.print(filePath)
      .then(() => console.log('Printed successfully!'))
      .catch(err => console.error('Printing failed:', err));
  });

  

function createWindow() {
    win = new BrowserWindow({width: 800, height: 800});
    win.loadFile('dist/electron-app/index.html');
  }

  app.whenReady().then(() => {
    
    createWindow()
  })

  