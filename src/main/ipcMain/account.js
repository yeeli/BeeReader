const {ipcMain} = require('electron')

const { Account } = require('../model')

ipcMain.on('/account', (event, arg) => {
  Account.all().then(res => {
    event.sender.send('/accountResponse', {
        meta: { status: 'success' }, 
        data: { account: res }
      })
   })
})
