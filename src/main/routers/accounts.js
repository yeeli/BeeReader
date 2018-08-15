const {ipcMain} = require('electron')
const {Account, Entry} = require('../model')
const _ = require('lodash')

ipcMain.on('/accounts', (event, arg, ktm) => {
  Account.all().then(res => {
    let asyncAccount = async () => {
      newAccount = []
      for(let account of res){
        let date = new Date()
        let count = await Entry.connection().whereRaw('account_id = ? AND published_at >= ? AND read_at is null', [account.id, new Date(date.toDateString()).getTime()]).count()
        account['today_count'] = count[0]['count(*)']
        newAccount.push(account)
      }
      return newAccount
    }
    asyncAccount().then(acc => {
      event.sender.send(`/accountsResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { account: res }
      })
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
