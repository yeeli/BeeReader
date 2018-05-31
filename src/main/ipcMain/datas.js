const {ipcMain} = require('electron')
const _ = require('lodash')

const { Data } = require('../model')

ipcMain.on('/datas', (event, arg) => {
  Data.where(params).then(res => {
    event.sender.send('/datasResponse', {
        meta: { status: 'success' }, 
        data: { datas: res }
      })
   })
})
