const {ipcMain} = require('electron')

const { Stream, Category } = require('../model')

ipcMain.on('/subscriptions', (event, arg) => {
  Stream.all().then(res => {
    event.sender.send('/subscriptionsResponse', {
        meta: { status: 'success' }, 
        data: { subscriptions: res }
      })
   })
})
