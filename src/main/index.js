const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const paths = require('../config/paths')
//const sync = require('./sync')
require('./ipcMain/accounts')
require('./ipcMain/categories')
require('./ipcMain/subscriptions')

let mainWindow

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true });
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    if(!BrowserWindow.getDevToolsExtensions()["Redux DevTools"]) {
      BrowserWindow.addDevToolsExtension(path.join(paths.extensions, "redux_devtools"))
    }
    if(!BrowserWindow.getDevToolsExtensions()["React Developer Tools"]) {
      BrowserWindow.addDevToolsExtension(path.join(paths.extensions, "react_developer_tools"))
    }
  }
}


const createWindow = async () =>{
  // Install Extensions
  installExtensions()
  
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
