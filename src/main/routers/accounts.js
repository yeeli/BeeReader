const {ipcMain} = require('electron')
const {Account} = require('../model')

ipcMain.on('/accounts', (event, arg, ktm) => {
  Account.all().then(res => {
    event.sender.send(`/accountsResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { account: res }
      })
   })
})
