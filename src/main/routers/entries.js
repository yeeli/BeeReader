const {ipcMain} = require('electron')
const _ = require('lodash')
const { Entry } = require('../model')
const Sync = require('../sync')

/*
 * /entries
 * 
 * @desc Get all entries in database
 *
 * @params stream_id [Integer] Stream id
 *
 */

ipcMain.on('/entries', (event, arg, ktm) => {
  let params = _.isNil(arg) ? {} : arg
  Entry.where(params).orderBy('created_at', 'desc').then(res => {
    event.sender.send(`/entriesResponse?ktm=${ktm}`, {
        meta: { status: 'success' }, 
        data: { entries: res }
      })
   })
})

/*
 *
 * /entries/sync
 *
 * @desc Sync all entries
 *
 * @params stream_id [Integer] stream Id
 *
 */
 
ipcMain.on('/entries/sync', (event, arg, ktm) => {
  let params = _.isNil(arg) ? {} : arg
  Sync.syncStream(arg.stream_id).then(res => {
     event.sender.send(`/entries/syncResponse?ktm=${ktm}`, {
       meta: {status: 'success'},
       data: { entries: res }
     })
  }).catch(e => {
    console.log(e)
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

ipcMain.on('/entries/make_read', (event, arg, ktm) => {

})
