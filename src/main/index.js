const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const paths = require('../config/paths')
console.log(paths)
require('./ipcMain/account')

let mainWindow

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true });
}

/*
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};
*/

const createWindow = async () =>{
  //await installExtensions();
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false, minWidth: 800, minHeight: 600})

  // and load the index.html of the app.
/*
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/main.html'),
    protocol: 'file:',
    slashes: true
  }))
*/
  mainWindow.loadURL("http://localhost:5000/dist/main.html")

 //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate',  () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.setName("BeeReader")
