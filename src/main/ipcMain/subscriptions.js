const {ipcMain} = require('electron')

const { Stream } = require('../model')

ipcMain.on('/subscriptions', (event, arg) => {
  Stream.all(arg).then(res => {
    event.sender.send('/subscriptionsResponse', {
        meta: { status: 'success' }, 
        data: { subscriptions: res }
      })
   })
})
