const {ipcMain} = require('electron')
const _ = require('lodash')
const { Stream } = require('../model')

ipcMain.on('/streams', (event, arg) => {
  if(_.isNil(arg)){
    params = {}
  } else {
    params = arg
  }
  console.log(params)
  Stream.where(params).then(res => {
    event.sender.send('/streamsResponse', {
        meta: { status: 'success' }, 
        data: { streams: res }
      })
   })
})
