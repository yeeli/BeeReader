const {ipcMain} = require('electron')
const _ = require('lodash')

const { Entry } = require('../model')

ipcMain.on('/entries', (event, arg) => {
  if(_.isNil(arg)){
    params = {}
  } else {
    params = arg
  }
  Entry.where(params).then(res => {
    event.sender.send('/entriesResponse', {
        meta: { status: 'success' }, 
        data: { entries: res }
      })
   })
})
