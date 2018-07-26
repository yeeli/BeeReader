const {ipcMain} = require('electron')
const _ = require('lodash')

const { Data } = require('../model')

ipcMain.on('/data', (event, arg) => {
  params = _.isNil(arg) ? {} : arg
  Data.where(params).then(res => {
    event.sender.send('/dataResponse', {
        meta: { status: 'success' }, 
        data: { data: res[0] }
      })
   })
})
