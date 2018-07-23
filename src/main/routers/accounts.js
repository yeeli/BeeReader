const {ipcMain} = require('electron')
const {Account} = require('../model')

ipcMain.on('/accounts', (event, arg) => {
  Account.all().then(res => {
    event.sender.send('/accountsResponse', {
        meta: { status: 'success' }, 
        data: { account: res }
      })
   })
})
