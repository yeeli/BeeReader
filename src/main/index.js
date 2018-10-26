if(!process.env.NODE_ENV){
  process.env.NODE_ENV = 'production'
}

const { app, BrowserWindow, Tray, Menu, session } =  require('electron')
const path = require('path');
const url = require('url');
const paths = require('./config/paths')
const fs = require('fs')


let dataPath = path.join(app.getPath('userData'), 'Data')
if(!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath)
}

require('./db/migrate')
require('./router')
const filter = require('./filter')



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


let tray = null

const createWindow = async () =>{


  // Install Extensions
  installExtensions()

  // windows infomation
  let win = {
    title: 'BeeReader',
    width: 1100, 
    height: 600, 
    //frame: false,
    titleBarStyle: 'hidden',
    minWidth: 1100, 
    minHeight: 600,
  }

  mainWindow = new BrowserWindow(win)
  let loadUrl

  if (process.env.NODE_ENV === 'development') {
    loadUrl = "http://localhost:5000/dist/main.html"
  } else {
    loadUrl = url.format({
      pathname: path.join(paths.appBuild, 'main.html'),
      protocol: 'file:',
      slashes: true
    })
  }

  mainWindow.loadURL(loadUrl)

  //mainWindow.webContents.openDevTools();
  //const ses = mainWindow.webContents.session

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  filter()


  // tray = new Tray(path.join(paths.publicSrc, 'assets/menu.png'))
  //const contextMenu = Menu.buildFromTemplate([
  //  {label: 'News 1'},
  //])
  //tray.setTitle('This is my application.')
  //tray.setContextMenu(contextMenu)
};


app.on('ready', createWindow);

app.setName('BeeReader')
app.dock.setIcon(path.join(paths.publicSrc, 'assets/icon.png'))

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

