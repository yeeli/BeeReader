const {ipcMain} = require('electron')
const {Account} = require('../model')
const _ = require('lodash')

ipcMain.on('/accounts', (event, arg, ktm) => {
  Account.all().then(res => {
    event.sender.send(`/accountsResponse?ktm=${ktm}`, {
      meta: { status: 'success' }, 
      data: { account: res }
    })
  })
})

ipcMain.on('/accounts/create', (event, arg, ktm) => {
  if(_.isNil(arg)){
    event.sender.send(`/accounts/createResponse?ktm=${ktm}`, {
      meta: { status: 'failed' } 
    })
    return false
  }
  Account.where({ service: arg.service }).then(res => {
    if (res.length > 0) {
      event.sender.send(`/accounts/createResponse?ktm=${ktm}`, {
        meta: { status: 'failed' } 
      })
      return false
    } else {
      if(arg.service == "Rss"){
        Account.create({
          oid: Date.now(),
          title: 'local',
          service: 'Rss',
          username: 'rss',
          sort: 0,
          state: 'active'
        }).then(res => { 
          event.sender.send(`/accounts/createResponse?ktm=${ktm}`, {
            meta: { status: 'success' }, 
            data: { account: res }
          })
        })
      }
    }
  })
})
