const {ipcMain} = require('electron')
const _ = require('lodash')
const { Stream } = require('../model')

/*
 * /streams
 *
 * @desc Get all streams list with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/streams', (event, arg) => {
  if(_.isNil(arg)){
    params = {}
  } else {
    params = arg
  }
  Stream.where(params).then(res => {
    event.sender.send('/streamsResponse', {
        meta: { status: 'success' }, 
        data: { streams: res }
      })
   })
})

/*
 * /streams/create
 *
 * @desc Sync all Stream with account
 *
 * @params account_id [Integer] Account id
 *
 */

ipcMain.on('/streams/create', (event, arg) => {

})

ipcMain.on('/streams/destroy', (event, arg) => {
})
