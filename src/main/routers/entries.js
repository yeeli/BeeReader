const {ipcMain} = require('electron')
const _ = require('lodash')
const { Entry } = require('../model')

/*
 * /entries
 * 
 * @desc Get all entries in database
 *
 * @params stream_id [Integer] Stream id
 *
 */

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

/*
 * /entries/create
 *
 * @desc get all entries with current stream
 *
 * @params stream_id [Integer] stream id
 * 
 */

ipcMain.on('/entries/create', (event, arg) => {

})
