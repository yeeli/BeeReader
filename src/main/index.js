const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const paths = require('../config/paths')

require('../db/migrate')
require('./routers')

let mainWindow

//let externalDisplay = displays.find((display) => {
//  return display.bounds.x !== 0 || display.bounds.y !== 0
//})

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

  // windows infomation
  let win = {
    width: 1100, 
    height: 600, 
    frame: false, 
    minWidth: 1100, 
    minHeight: 600
  }

  mainWindow = new BrowserWindow(win)


  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL("http://localhost:5000/dist/main.html")
  }

  // and load the index.html of the app.
  /*
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/main.html'),
    protocol: 'file:',
    slashes: true
  }))
  */

  //mainWindow.webContents.openDevTools();
  const ses = mainWindow.webContents.session
  console.log(ses.getUserAgent())

  mainWindow.on('closed', () => {
    mainWindow = null
  })
};


app.setName("BeeReader")

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

