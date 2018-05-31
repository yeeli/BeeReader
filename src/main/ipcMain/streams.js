const {ipcMain} = require('electron')

const { Stream } = require('../model')

ipcMain.on('/streams', (event, arg) => {
  Stream.all(arg).then(res => {
    event.sender.send('/streamsResponse', {
        meta: { status: 'success' }, 
        data: { streams: res }
      })
   })
})
